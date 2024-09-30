import { AuthForm } from "./auth-form";
import { authAction } from "./auth-action";

export default function AuthPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <AuthForm serverAction={authAction} />
    </div>
  );
}
