import { Webhook } from 'svix';
import { headers } from 'next/headers';

import { createUser, updateUser } from '@/lib/actions/user.action';
import { clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Do something with the payload
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // Sync Clerk user with MongoDB
  // Create User in MongoDB
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username || null,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
      role: 'user',
      accountType: 'active',
    };

    try {
      const newUser = await createUser(user);
      console.log('User created:', newUser);

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      return NextResponse.json({ message: 'New user created', user: newUser });
    } catch (error) {
      console.log('Error creating user:', error);
      return new Response('Error occured while creating a user', {
        status: 500,
      });
    }
  }

  // Update User in MongoDB
  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username || null,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    try {
      const updatedUser = await updateUser(user);
      console.log('User updated:', updatedUser);
      return NextResponse.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
      console.log('Error updating user:', error);
      return new Response('Error occured while updating a user', {
        status: 500,
      });
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  return new Response('', { status: 200 });
}
