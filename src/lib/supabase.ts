import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Missing Supabase environment variables during build!")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
}

export interface TestResult {
  id: string
  user_id: string
  test_type: 'iq_basic' | 'iq_advanced' | 'personality' | 'career'
  score: number
  answers: number[]
  is_paid: boolean
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  test_result_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  stripe_payment_intent_id?: string
  created_at: string
}
