'use client';

import { useUser } from '@clerk/nextjs'; // Client-side hook for accessing user information

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-3">NextJs App Template</h1>
        {isSignedIn && isLoaded ? (
          <p>
            Welcome back, {user.firstName} {user.lastName}!
          </p>
        ) : (
          <p>
            <a
              href="/sign-in"
              className="font-medium hover:text-blue-600 hover:underline"
            >
              Sign in
            </a>{' '}
            to get started.
          </p>
        )}
      </div>
    </section>
  );
}
