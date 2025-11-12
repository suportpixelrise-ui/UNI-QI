import { createClient } from '@supabase/supabase-js'

/**
 * Configuração principal do Supabase Client
 * (Usa variáveis de ambiente públicas para acesso seguro no front)
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificação de segurança no build
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase environment variables estão ausentes durante o build!")
}

// Criação única do client Supabase
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

/**
 * ----------------------------
 * 🔹 Tipos de dados do banco
 * ----------------------------
 */

// Perfil de usuário
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
}

// Resultado de testes
export interface TestResult {
  id: string
  user_id: string
  test_type: 'iq_basic' | 'iq_advanced' | 'personality' | 'career'
  score: number
  answers: number[]
  is_paid: boolean
  created_at: string
}

// Pagamentos (Stripe)
export interface Payment {
  id: string
  user_id: string
  test_result_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  stripe_payment_intent_id?: string
  created_at: string
}

/**
 * ----------------------------
 * 🔹 Funções utilitárias
 * ----------------------------
 */

// Teste rápido de conexão
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1)
    if (error) throw error
    console.log('✅ Supabase conectado:', data)
  } catch (err) {
    console.error('❌ Erro de conexão com Supabase:', err)
  }
}
