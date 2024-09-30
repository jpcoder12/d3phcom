export type AuthState = {
  success: boolean;
  message: string;
} | null;

export type AuthAction = (prevState: AuthState, formData: FormData) => Promise<AuthState>;
