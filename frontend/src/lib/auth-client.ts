import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  fetchOptions: {
    credentials: 'include'
  }
})

export const {signUp, signIn, signOut} = authClient;
