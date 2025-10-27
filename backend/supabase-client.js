import dotenv from "dotenv";
dotenv.config(); // ✅ must be the first line

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default supabase;
