import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://hawwjmnrvwcahvtvnjob.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd3dqbW5ydndjYWh2dHZuam9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMzQ0NzYsImV4cCI6MjA1NjkxMDQ3Nn0.SEwiKXcOmptKZ7kegDXg2ImpAxeAqnvB-wcf2bK69oY"
)

export default supabase
