'use server';

import User from '@/lib/models/user.model';
import { connectToDatabase } from '@/lib/db';

// Find a user in MongoDB by email
export async function findUserByEmail(email) {
  await connectToDatabase();
  console.log('Connected to MongoDB and finding user by email');

  try {
    const user = await User.findOne({ email });
    // console.log('From the user.action: User found by email', user);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Create a new user in MongoDB
export async function createUser(user) {
  await connectToDatabase();
  console.log('Connected to MongoDB and creating user');

  try {
    const newUser = await User.create(user);
    console.log('User created', newUser);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Update a user in MongoDB using ClerkID
export async function updateUser(user) {
  await connectToDatabase();
  console.log('Connected to MongoDB and updating user');

  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: user.clerkId },
      { $set: user },
      { new: true }
    );
    console.log('From the user.action: User updated', updatedUser);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Delete a user in MongoDB using ClerkID
export async function deleteUser(clerkId) {
  await connectToDatabase();
  console.log('Connected to MongoDB and deleting user');

  try {
    const deletedUser = await User.findOneAndDelete({ clerkId });
    console.log('From the user.action: User deleted', deletedUser);
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    console.log(error);
    return error;
  }
}
