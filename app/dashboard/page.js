import { currentUser } from '@clerk/nextjs/server';

export default async function page() {
  const user = await currentUser(); // Server-side hook for accessing user information

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-3">Dashboard</h1>
        <p>
          Welcome back,{' '}
          {user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}!
          You can see view this protected route because you are signed in.
        </p>
      </div>
    </section>
  );
}
