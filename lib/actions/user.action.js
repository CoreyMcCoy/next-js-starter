'use server';

import User from '@/lib/models/user.model';
import { connectToDatabase } from '@/lib/db';

export async function createUser(user) {
  await connectToDatabase();
  try {
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
