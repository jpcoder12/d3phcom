"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useFormState } from "react-dom";
import { AuthAction, AuthState } from "./types";

interface AuthFormProps {
  serverAction: AuthAction;
}

export function AuthForm({ serverAction }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [state, formAction] = useFormState<AuthState, FormData>(serverAction, null);
  const router = useRouter();

  if (state?.success) {
    // Redirect to dashboard or home page after successful auth
    router.push("/dashboard");
  }

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
        <CardDescription>
          {isLogin ? "Enter your credentials to login" : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' name='email' type='email' placeholder='Enter your email' required />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Enter your password'
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col'>
          <Button className='w-full' type='submit'>
            {isLogin ? "Login" : "Register"}
          </Button>
          {state?.message && (
            <p className={`mt-4 text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
              {state.message}
            </p>
          )}
        </CardFooter>
        <input type='hidden' name='isLogin' value={isLogin.toString()} />
      </form>
      <CardFooter>
        <Button variant='link' className='w-full' onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}
