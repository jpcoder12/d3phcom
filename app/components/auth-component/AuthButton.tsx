"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <p>✅ Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()} className='bg-red-500 px-4 py-2 rounded'>
            Sign Out
          </button>

          {/* Content shown only to logged-in users */}
          <div className='mt-4 p-4 bg-green-500 rounded'>🌟 Secret Content!</div>
        </div>
      ) : (
        <div>
          <p>❌ Not signed in</p>
          <button onClick={() => signIn("google")} className='bg-blue-500 px-4 py-2 rounded'>
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
}
