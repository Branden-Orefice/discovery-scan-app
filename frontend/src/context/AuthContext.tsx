import React, { createContext, useContext, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

interface AuthContextType {
  session: {
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    };
  } | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: session,
    isPending: loading,
    error,
    refetch,
  } = authClient.useSession();

  useEffect(() => {
    if (error) {
      console.error("The session encountered an error.");
    }
  }, [error]);

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("There was a problem signing out.");
      console.error("There was an issue with signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, signOut, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
