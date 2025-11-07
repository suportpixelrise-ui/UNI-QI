'use client'

import { useState } from 'react'
import { Brain, User, Briefcase, Trophy, Star, ArrowRight, Sparkles, Target, Globe, Zap } from 'lucide-react'
import { testimonials } from '@/lib/extended-quiz-data'

interface TestHubProps {
  onSelectTest: (testType: string) => void
}

export default function TestHub({ onSelectTest }: TestHubProps) {
  const [hoveredTest, setHoveredTest] = useState<string | null>(null)

  const tests = [
    {
      id: 'iq',
      title: 'Teste de QI',
      subtitle: 'Descubra sua inteligência',
      description: 'Avalie seu raciocínio lógico, matemático e verbal com questões científicas',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-500/20 to-purple-600/20',
      features: ['20 questões científicas', 'Análise detalhada', 'Ranking global', 'Certificado'],
      stats: '95% de precisão'
    },
    {
      id: 'personality',
      title: 'Teste de Personalidade',
      subtitle: 'Conheça seu perfil único',
      description: 'Descubra seus traços de personalidade e como eles influenciam sua vida',
      icon: User,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-500/20 to-rose-600/20',
      features: ['Análise MBTI', 'Pontos fortes', 'Áreas de melhoria', 'Compatibilidade'],
      stats: '16 tipos diferentes'
    },
    {
      id: 'career',
      title: 'Teste de Carreira',
      subtitle: 'Encontre sua vocação',
      description: 'Identifique as carreiras que mais combinam com seu perfil e interesses',
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-500/20 to-teal-600/20',
      features: ['200+ profissões', 'Match personalizado', 'Salários médios', 'Próximos passos'],
      stats: '85% encontram nova direção'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-3xl">
                  <Globe className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              UNI-AQI
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> HUB</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-light max-w-3xl mx-auto">
              Descubra seu verdadeiro potencial através de testes científicos e precisos
            </p>
            
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              Mais de <span className="text-yellow-400 font-semibold">50.000 pessoas</span> já descobriram insights únicos sobre si mesmas
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-white/70 text-sm">Precisão</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">50k+</p>
                <p className="text-white/70 text-sm">Usuários</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">4.9</p>
                <p className="text-white/70 text-sm">Avaliação</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">15min</p>
                <p className="text-white/70 text-sm">Por teste</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {tests.map((test) => {
            const Icon = test.icon
            return (
              <div
                key={test.id}
                className="group relative"
                onMouseEnter={() => setHoveredTest(test.id)}
                onMouseLeave={() => setHoveredTest(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${test.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105 h-full">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${test.color} mb-4`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{test.title}</h3>
                    <p className="text-white/80 font-medium">{test.subtitle}</p>
                    <p className="text-white/60 text-sm mt-2">{test.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {test.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${test.color}`}></div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className={`bg-gradient-to-r ${test.bgColor} rounded-xl p-3 mb-6 border border-white/10`}>
                    <p className="text-white text-center font-semibold">{test.stats}</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onSelectTest(test.id)}
                    className={`w-full bg-gradient-to-r ${test.color} hover:shadow-lg text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 group-hover:shadow-2xl`}
                  >
                    Começar Teste
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            O que nossos usuários dizem
          </h2>
          <p className="text-white/70 text-lg">
            Milhares de pessoas já transformaram suas vidas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/80 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-yellow-400/30 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para se descobrir?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já descobriram seu verdadeiro potencial. 
            Comece sua jornada de autoconhecimento hoje mesmo!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onSelectTest('iq')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              Começar com QI
            </button>
            <button
              onClick={() => onSelectTest('personality')}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              Teste de Personalidade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}