'use client';

import { useUser } from '@clerk/nextjs'; // Client-side hook for accessing user information
import Link from 'next/link';

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
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
    </>
  );
}
