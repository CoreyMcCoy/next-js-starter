'use client';

import { useUser } from '@clerk/nextjs'; // Client-side hook for accessing user information

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-3">
          NextJS, Clerk and MongoDB App Template
        </h1>
        {isSignedIn && isLoaded ? (
          <div className="md:w-4/6">
            <p>
              Welcome back,{' '}
              {user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}
              !
            </p>
            <p className="mt-3">
              This template includes a Next.js frontend, Clerk authentication, a
              MongoDB database, and Stripe Checkout integration. You can use
              this template to build your own app.
            </p>
          </div>
        ) : (
          <p>
            <a
              href="/sign-in"
              className="font-medium hover:text-blue-600 hover:underline"
            >
              Sign in
            </a>{' '}
            to view your dashboard.
          </p>
        )}
      </div>
    </section>
  );
}
