import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xcltqhgqwovfkcuotpum.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbHRxaGdxd292ZmtjdW90cHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTcyNjgsImV4cCI6MjA1NDI3MzI2OH0.qk7_7a9YOLN04Ttdy3fXLs4kbdFY5SOmc2ecgWudC2k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})