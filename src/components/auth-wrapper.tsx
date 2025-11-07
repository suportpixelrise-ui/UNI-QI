'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Brain, Lock, Shield, Star } from 'lucide-react'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar usuário atual
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">UNI-AQI</h1>
              <p className="text-white/80">Entre para descobrir seu potencial</p>
            </div>

            {/* Benefícios */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3 text-white/90">
                <Brain className="w-5 h-5 text-blue-400" />
                <span className="text-sm">3 tipos de testes disponíveis</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">Resultados científicos e precisos</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Relatórios detalhados</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Lock className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Dados 100% seguros</span>
              </div>
            </div>

            {/* Formulário de autenticação */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#f59e0b',
                        brandAccent: '#d97706',
                        brandButtonText: 'white',
                        defaultButtonBackground: 'rgba(255,255,255,0.1)',
                        defaultButtonBackgroundHover: 'rgba(255,255,255,0.2)',
                        defaultButtonBorder: 'rgba(255,255,255,0.2)',
                        defaultButtonText: 'white',
                        dividerBackground: 'rgba(255,255,255,0.2)',
                        inputBackground: 'rgba(255,255,255,0.1)',
                        inputBorder: 'rgba(255,255,255,0.2)',
                        inputBorderHover: 'rgba(255,255,255,0.4)',
                        inputBorderFocus: '#f59e0b',
                        inputText: 'white',
                        inputLabelText: 'rgba(255,255,255,0.8)',
                        inputPlaceholder: 'rgba(255,255,255,0.5)',
                        messageText: 'rgba(255,255,255,0.9)',
                        messageTextDanger: '#ef4444',
                        anchorTextColor: '#f59e0b',
                        anchorTextHoverColor: '#d97706',
                      },
                      space: {
                        spaceSmall: '4px',
                        spaceMedium: '8px',
                        spaceLarge: '16px',
                        labelBottomMargin: '8px',
                        anchorBottomMargin: '4px',
                        emailInputSpacing: '4px',
                        socialAuthSpacing: '4px',
                        buttonPadding: '10px 15px',
                        inputPadding: '10px 15px',
                      },
                      fontSizes: {
                        baseBodySize: '14px',
                        baseInputSize: '14px',
                        baseLabelSize: '14px',
                        baseButtonSize: '14px',
                      },
                      borderWidths: {
                        buttonBorderWidth: '1px',
                        inputBorderWidth: '1px',
                      },
                      radii: {
                        borderRadiusButton: '8px',
                        buttonBorderRadius: '8px',
                        inputBorderRadius: '8px',
                      },
                    },
                  },
                }}
                providers={['google']}
                redirectTo={`${window.location.origin}/dashboard`}
                onlyThirdPartyProviders={false}
                magicLink={true}
                showLinks={true}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      button_label: 'Entrar',
                      loading_button_label: 'Entrando...',
                      social_provider_text: 'Entrar com {{provider}}',
                      link_text: 'Já tem uma conta? Entre aqui',
                      confirmation_text: 'Verifique seu email para o link de confirmação',
                    },
                    sign_up: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      button_label: 'Criar conta',
                      loading_button_label: 'Criando conta...',
                      social_provider_text: 'Criar conta com {{provider}}',
                      link_text: 'Não tem uma conta? Crie aqui',
                      confirmation_text: 'Verifique seu email para confirmar sua conta',
                    },
                    magic_link: {
                      email_input_label: 'Email',
                      email_input_placeholder: 'Seu email',
                      button_label: 'Enviar link mágico',
                      loading_button_label: 'Enviando link...',
                      link_text: 'Enviar um link mágico por email',
                      confirmation_text: 'Verifique seu email para o link de acesso',
                    },
                    forgotten_password: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      button_label: 'Enviar instruções',
                      loading_button_label: 'Enviando instruções...',
                      link_text: 'Esqueceu sua senha?',
                      confirmation_text: 'Verifique seu email para as instruções de redefinição de senha',
                    },
                  },
                }}
              />
            </div>

            <p className="text-center text-white/60 text-xs mt-4">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}