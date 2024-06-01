'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs'; // Client-side hook for accessing user information
import Link from 'next/link';
import { createUser } from '@/lib/actions/user.action';

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [testUser, setTestUser] = useState({
    clerkId: 'ckuqzjz9e0000bq6z5z1z9z9z',
    email: 'jarvis@bot.net',
    username: 'jarvis',
    password: 'password',
    role: 'admin',
    accountType: 'lifetime',
  });

  const { clerkId, email, username, password, role, accountType } = testUser;

  // Create a user in the database
  const handleCreate = async () => {
    console.log('Creating user...', testUser);
    try {
      const data = await createUser({
        clerkId,
        email,
        username,
        password,
        role,
        accountType,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center mb-20">
        <h1 className="text-2xl font-semibold mb-3">NextJS, Clerk and MongoDB App Template</h1>
        {isSignedIn && isLoaded ? (
          <>
            <p>Welcome back, {user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}!</p>
            <p className="mt-3">
              This is a fullstack app template that uses: Next.js, Clerk, MongoDB, and Stripe.
            </p>
          </>
        ) : (
          <p>
            <Link href="/sign-in" className="font-medium hover:text-pink-600 hover:underline">
              Sign in
            </Link>{' '}
            to view the dashboard.
          </p>
        )}
      </div>
      <div className="text-center">
        <button
          onClick={handleCreate}
          className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700"
        >
          Create User
        </button>
      </div>
    </>
  );
}
