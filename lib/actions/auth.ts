// File: lib/actions/auth.ts
"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
  const { email, password } = params;

  try {
    // Pass the correct parameters that match the credentials provider
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    if (result?.error) {
      console.log("Sign in error:", result.error);
      return { success: false, message: result.error };
    }

    return { success: true, message: "Sign in successful" };
  } catch (error) {
    console.log("Sign in exception:", error);
    return { success: false, message: "Error signing in" };
  }
};

export const signup = async (
  params: AuthCredentials
): Promise<{ success: boolean; error?: string }> => {
  const { fullName, email, password, universityId, universityCard } = params;

  try {
    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, error: "User already exists" };
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    // Sign in the newly created user
    const signInResult = await signInWithCredentials({ email, password });

    if (!signInResult.success) {
      return { success: false, error: signInResult.message || "Sign in failed" };
    }

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Error creating user" };
  }
};