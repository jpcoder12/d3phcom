"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className='text-gray-500'>🔄 Checking authentication...</p>;
  }

  return (
    <div className='p-4 border rounded-md shadow-md text-center'>
      {session ? (
        <div>
          <p className='mb-2 text-green-600'>✅ Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition'>
            Sign Out
          </button>

          {/* Content shown only to logged-in users */}
          <div className='mt-4 p-4 bg-green-500 text-white rounded-md shadow-md'>
            🌟 Secret Content Just for You!
          </div>
        </div>
      ) : (
        <div>
          <p className='mb-2 text-red-600'>❌ Not signed in</p>
          <button
            onClick={() => signIn("google")}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition'>
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
}
