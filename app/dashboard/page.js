import { currentUser } from '@clerk/nextjs/server';

export default async function page() {
  const user = await currentUser(); // Server-side hook for accessing user information

  return (
    <>
      <div className="text-center mb-20">
        <h1 className="text-2xl font-semibold mb-3">Dashboard</h1>
        <p>
          Welcome back, {user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}! You can
          see this protected route because you are signed in.
        </p>
      </div>
    </>
  );
}
