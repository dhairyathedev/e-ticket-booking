'use server'; // This line might be specific to your environment setup

import { createClient } from "@/utils/supabase/server";

export async function onBoardUserProfile(name: string) {
    const supabase = createClient();
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            throw new Error("User not found");
        }
        const user_id = user.id;
        console.log("Inserting user profile for user_id:", user_id);


        const { data, error } = await supabase.from("user_profile").insert([
            {
                user_id,
                name
            }
        ]).select("*");

        if (error) {
            console.error("Error inserting user profile:", error.message);
            throw error;
        }

        console.log("Successfully inserted user profile:", data);

        return data;
    } catch (error: any) {
        console.error("Error in onBoardUserProfile:", error.message);
        throw error;
    }
}