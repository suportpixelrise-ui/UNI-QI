'use client'

import { useState, useEffect } from 'react'
import { CreditCard, X, Clock, Shield, Star, Zap, ArrowRight, CheckCircle, Brain, User, Briefcase, Target, TrendingUp, Award } from 'lucide-react'
import { testimonials, testPricing } from '@/lib/extended-quiz-data'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
  testType: string
  testTitle: string
  partialResult?: {
    score: number
    percentage: number
    iq?: number
  }
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  testType, 
  testTitle,
  partialResult 
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos em segundos
  const [showUpsell, setShowUpsell] = useState(false)

  // Timer de escassez
  useEffect(() => {
    if (!isOpen) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  // Detectar tentativa de sair
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true)
      }
    }

    if (isOpen) {
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [isOpen, showExitIntent])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simular processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess()
    }, 3000)
  }

  const pricing = testPricing[testType as keyof typeof testPricing] || testPricing.iq_basic

  // Gatilhos específicos por teste
  const getTestSpecificContent = () => {
    switch (testType) {
      case 'iq_basic':
      case 'iq_advanced':
        return {
          icon: Brain,
          color: 'from-blue-500 to-purple-600',
          bgColor: 'from-blue-500/20 to-purple-600/20',
          title: '🧠 Descubra Seu Verdadeiro Potencial Intelectual',
          subtitle: 'Você está prestes a descobrir insights únicos sobre sua inteligência',
          snippet: partialResult?.iq ? `Seu QI preliminar: ${partialResult.iq}` : `${partialResult?.percentage}% de acertos`,
          benefits: [
            'Análise completa do seu QI por categoria',
            'Comparação detalhada com a população mundial',
            'Identificação dos seus pontos fortes cognitivos',
            'Recomendações para desenvolvimento intelectual',
            'Certificado oficial para compartilhar',
            'Ranking exclusivo entre usuários'
          ],
          motivation: 'Você demonstrou um raciocínio excepcional! Descubra o que isso significa para seu potencial e como usar essa inteligência a seu favor.',
          urgency: 'Apenas 2% da população tem acesso a uma análise tão detalhada do QI.'
        }
      
      case 'personality':
        return {
          icon: User,
          color: 'from-pink-500 to-rose-600',
          bgColor: 'from-pink-500/20 to-rose-600/20',
          title: '✨ Desvende os Segredos da Sua Personalidade',
          subtitle: 'Autoconhecimento profundo que vai transformar sua vida',
          snippet: 'Perfil único identificado com base em suas respostas',
          benefits: [
            'Análise completa do seu tipo de personalidade',
            'Descoberta dos seus traços únicos e talentos',
            'Insights sobre relacionamentos e compatibilidade',
            'Guia para desenvolvimento pessoal',
            'Estratégias para melhorar comunicação',
            'Certificado de personalidade para compartilhar'
          ],
          motivation: 'Suas respostas revelaram aspectos fascinantes da sua personalidade. Descubra como usar esses insights para melhorar seus relacionamentos e alcançar seus objetivos.',
          urgency: 'Pessoas que conhecem sua personalidade têm 3x mais chances de sucesso profissional.'
        }
      
      case 'career':
        return {
          icon: Briefcase,
          color: 'from-emerald-500 to-teal-600',
          bgColor: 'from-emerald-500/20 to-teal-600/20',
          title: '🎯 Encontre Sua Carreira dos Sonhos',
          subtitle: 'O caminho para o sucesso profissional está aqui',
          snippet: 'Carreiras ideais identificadas com base no seu perfil',
          benefits: [
            'Top 5 carreiras perfeitas para seu perfil',
            'Análise de compatibilidade profissional',
            'Salários médios e perspectivas de crescimento',
            'Habilidades necessárias para cada carreira',
            'Plano de ação personalizado',
            'Networking e oportunidades exclusivas'
          ],
          motivation: 'Você tem um perfil profissional único! Descubra as carreiras que vão te realizar e trazer o sucesso que você merece.',
          urgency: '85% dos nossos usuários mudaram de carreira e aumentaram sua satisfação profissional em 6 meses.'
        }
      
      default:
        return {
          icon: Brain,
          color: 'from-blue-500 to-purple-600',
          bgColor: 'from-blue-500/20 to-purple-600/20',
          title: '🔓 Desbloqueie Seu Resultado Completo',
          subtitle: 'Descubra insights únicos sobre você',
          snippet: 'Resultado parcial disponível',
          benefits: [],
          motivation: '',
          urgency: ''
        }
    }
  }

  const testContent = getTestSpecificContent()
  const TestIcon = testContent.icon

  if (!isOpen) return null

  // Pop-up de abandono
  if (showExitIntent) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-red-900/90 to-pink-900/90 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-red-500/30 shadow-2xl">
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl w-fit mx-auto mb-4">
              <Zap className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              ⚡ Espere! Oferta Especial!
            </h3>
            
            <p className="text-white/90 mb-6">
              Antes de sair, que tal ver um preview EXTRA do seu resultado?
            </p>
            
            {partialResult && (
              <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/20">
                <p className="text-white font-semibold mb-2">Seu Preview Exclusivo:</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {testContent.snippet}
                </p>
                <p className="text-white/70 text-sm mt-2">
                  Você está no top 25% dos usuários! 🏆
                </p>
              </div>
            )}
            
            <div className="space-y-3 mb-6">
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Desbloquear por {pricing.price}
              </button>
              
              <button
                onClick={() => setShowExitIntent(false)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-white/20"
              >
                Continuar vendo
              </button>
              
              <button
                onClick={onClose}
                className="w-full text-white/60 hover:text-white text-sm transition-colors"
              >
                Sair sem desbloquear
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900/95 to-indigo-900/95 backdrop-blur-lg rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900/95 to-indigo-900/95 backdrop-blur-lg p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`bg-gradient-to-r ${testContent.color} p-3 rounded-2xl`}>
                <TestIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{testContent.title}</h2>
                <p className="text-white/70">{testContent.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Timer de escassez */}
          <div className="mt-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-3 border border-red-500/30">
            <div className="flex items-center justify-center gap-2 text-white">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="font-semibold">Oferta expira em: {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Resultado Parcial com Gatilho Específico */}
          {partialResult && (
            <div className="mb-8">
              <div className={`bg-gradient-to-r ${testContent.bgColor} rounded-2xl p-6 border border-white/20 mb-6`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🎉 Parabéns! Você completou o teste!
                  </h3>
                  
                  <div className="bg-white/10 rounded-xl p-4 mb-4">
                    <p className="text-white/80 mb-2">Seu resultado parcial:</p>
                    <p className="text-3xl font-bold text-white mb-2">
                      {testContent.snippet}
                    </p>
                  </div>
                  
                  <p className="text-white/90 text-lg leading-relaxed">
                    {testContent.motivation}
                  </p>
                </div>
              </div>
              
              {/* Urgência específica */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl p-4 border border-yellow-400/30 mb-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                  <p className="text-white font-semibold">{testContent.urgency}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefícios Específicos */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                O que você vai desbloquear:
              </h3>
              
              <div className="space-y-4 mb-8">
                {testContent.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Prova Social Específica */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  O que outros usuários dizem:
                </h4>
                <div className="space-y-3">
                  {testimonials
                    .filter(t => t.testType === testType.replace('_basic', '').replace('_advanced', ''))
                    .slice(0, 2)
                    .map((testimonial) => (
                    <div key={testimonial.id} className="flex items-start gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-white/80 text-sm italic">"{testimonial.text}"</p>
                        <p className="text-white/60 text-xs mt-1">- {testimonial.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Apenas {pricing.price}
                  </h3>
                  <p className="text-white/70">Pagamento único • Sem mensalidades</p>
                  {pricing.discount && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
                      {pricing.discount}
                    </div>
                  )}
                </div>

                {/* Garantias */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/80">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">Resultado liberado instantaneamente</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">Garantia de satisfação</span>
                  </div>
                </div>

                {/* Botão de Pagamento */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full bg-gradient-to-r ${testContent.color} hover:shadow-lg disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-4`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-6 h-6" />
                      Desbloquear Agora
                    </>
                  )}
                </button>

                <p className="text-center text-white/60 text-xs">
                  Processado via Stripe • Dados criptografados
                </p>
              </div>

              {/* Upsell */}
              {!showUpsell && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowUpsell(true)}
                    className="w-full text-center text-white/70 hover:text-white text-sm transition-colors"
                  >
                    Ver outros testes disponíveis →
                  </button>
                </div>
              )}

              {showUpsell && (
                <div className="mt-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-400/30">
                  <h4 className="text-white font-semibold mb-3">🎁 Oferta Especial!</h4>
                  <p className="text-white/80 text-sm mb-4">
                    Desbloqueie TODOS os testes com 50% de desconto:
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Teste de Personalidade</span>
                      <span className="text-white">R$ 14,90</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Teste de Carreira</span>
                      <span className="text-white">R$ 16,90</span>
                    </div>
                    <div className="border-t border-white/20 pt-2 flex justify-between font-semibold">
                      <span className="text-white">Pacote Completo</span>
                      <span className="text-green-400">R$ 39,90</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300">
                    Pegar Oferta Completa
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}