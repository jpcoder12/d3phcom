"use server";

import { AuthState } from "./types";

export async function authAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const isLogin = formData.get("isLogin") === "true";

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Here you would typically validate the input and interact with your auth service
  if (email === "test@example.com" && password === "password") {
    return {
      success: true,
      message: isLogin ? "Logged in successfully!" : "Registered successfully!",
    };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
}
