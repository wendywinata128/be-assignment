import supabase from "../config/supabase.js";

export const getUserInfo = async (id) => {
    return supabase.from('users').select().eq('id', id);
}