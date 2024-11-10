"use server";

import { createClient } from "@/supabase/server";

export const authenticate = async (email: string, password: string) => {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error) {
    console.error("Authentication ERROR!!", error);
    throw error;
  }
};
