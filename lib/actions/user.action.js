'use server';

import User from '@/lib/models/user.model';
import { connectToDatabase } from '@/lib/db';

// Create a new user in MongoDB
export async function createUser(user) {
  await connectToDatabase();
  try {
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// Update a user in MongoDB
export async function updateUser(user) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ email: user.email }, user, { new: true });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}
