import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createUser, updateUser, deleteUser } from '@/lib/actions/user.action';

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

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

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
      // Add more fields as needed that will be added to the user object in the database. Example:
      //    tokens: 1,
      //    isVerified: false,
    };

    try {
      const newUser = await createUser(user);
      console.log('newUser:', newUser);

      return new Response('From the webhook route: User created', { status: 200 });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error creating user', { status: 500 });
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
      console.log('updatedUser:', updatedUser);

      return new Response('From the webhook route: User updated', { status: 200 });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  // Delete User in MongoDB
  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    try {
      const deletedUser = await deleteUser(id);
      console.log('deletedUser:', deletedUser);

      return new Response('From the webhook route: User deleted', { status: 200 });
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  // If the event type is not user.created, user.updated, or user.deleted
  return new Response('From the webhook route: Event type not recognized - but handled', {
    status: 200,
  });
}
