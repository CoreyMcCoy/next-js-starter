import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center">
        <SignUp />
      </div>
    </>
    // <>
    //   {/* Remove this after going into production */}
    //   <div className="text-center mb-20">
    //     <h1 className="text-3xl md:text-4xl font-bold mb-5">
    //       Clone this repo, set-up Clerk and your database, then remove this code to sign-up.
    //     </h1>
    //   </div>
    // </>
  );
}
