'use client'

import { useState } from 'react'
import { Brain, Zap, Target, ArrowRight, Clock, Trophy } from 'lucide-react'

interface IQTestSelectorProps {
  onSelectSubtest: (testType: 'basic' | 'advanced') => void
  onBack: () => void
}

export default function IQTestSelector({ onSelectSubtest, onBack }: IQTestSelectorProps) {
  const [selectedTest, setSelectedTest] = useState<'basic' | 'advanced' | null>(null)

  const tests = [
    {
      id: 'basic' as const,
      title: 'Teste Básico',
      subtitle: 'Ideal para iniciantes',
      description: 'Avaliação fundamental das suas habilidades cognitivas com questões de dificuldade moderada',
      duration: '10-15 min',
      questions: '15 questões',
      difficulty: 'Fácil a Médio',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-500/20 to-emerald-600/20',
      features: [
        'Matemática básica',
        'Lógica simples',
        'Raciocínio verbal',
        'Padrões visuais',
        'Resultado detalhado'
      ],
      recommended: false
    },
    {
      id: 'advanced' as const,
      title: 'Teste Avançado',
      subtitle: 'Para mentes desafiadoras',
      description: 'Avaliação completa e rigorosa com questões complexas para uma análise profunda do seu QI',
      duration: '20-25 min',
      questions: '20 questões',
      difficulty: 'Médio a Difícil',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-500/20 to-indigo-600/20',
      features: [
        'Matemática avançada',
        'Lógica complexa',
        'Análise verbal profunda',
        'Raciocínio abstrato',
        'Relatório completo',
        'Comparação detalhada'
      ],
      recommended: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Voltar ao Hub
          </button>
          
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-3xl">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha seu Teste de QI
          </h1>
          
          <p className="text-xl text-white/80 mb-2">
            Selecione o nível que melhor se adequa ao seu perfil
          </p>
          
          <p className="text-white/60">
            Ambos os testes são cientificamente validados e fornecem resultados precisos
          </p>
        </div>

        {/* Tests Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {tests.map((test) => {
            const Icon = test.icon
            const isSelected = selectedTest === test.id
            
            return (
              <div
                key={test.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setSelectedTest(test.id)}
              >
                {/* Recommended Badge */}
                {test.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      RECOMENDADO
                    </div>
                  </div>
                )}

                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${test.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
                  isSelected ? 'opacity-40' : ''
                }`}></div>
                
                <div className={`relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 transition-all duration-300 ${
                  isSelected 
                    ? `border-gradient-to-r ${test.color.replace('from-', 'border-').replace('to-', 'border-')} shadow-2xl` 
                    : 'border-white/20 hover:border-white/40'
                }`}>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${test.color} mb-4`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{test.title}</h3>
                    <p className="text-white/80 font-medium mb-2">{test.subtitle}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{test.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Clock className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-semibold text-sm">{test.duration}</div>
                      <div className="text-white/60 text-xs">Duração</div>
                    </div>
                    <div className="text-center">
                      <Target className="w-6 h-6 text-green-400 mx-auto mb-1" />
                      <div className="text-white font-semibold text-sm">{test.questions}</div>
                      <div className="text-white/60 text-xs">Questões</div>
                    </div>
                    <div className="text-center">
                      <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                      <div className="text-white font-semibold text-sm">{test.difficulty}</div>
                      <div className="text-white/60 text-xs">Nível</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {test.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${test.color}`}></div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className={`bg-gradient-to-r ${test.bgColor} rounded-xl p-3 mb-4 border border-white/20`}>
                      <p className="text-white text-center font-semibold text-sm">✓ Teste Selecionado</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Button */}
        {selectedTest && (
          <div className="text-center">
            <button
              onClick={() => onSelectSubtest(selectedTest)}
              className={`bg-gradient-to-r ${
                selectedTest === 'basic' 
                  ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                  : 'from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
              } text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto`}
            >
              <Brain className="w-6 h-6" />
              Começar {selectedTest === 'basic' ? 'Teste Básico' : 'Teste Avançado'}
              <ArrowRight className="w-6 h-6" />
            </button>
            
            <p className="text-white/60 text-sm mt-4">
              ⏱️ Tempo estimado: {selectedTest === 'basic' ? '10-15' : '20-25'} minutos
            </p>
          </div>
        )}

        {/* Comparison Table */}
        <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Comparação Detalhada</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/80">Característica</th>
                  <th className="text-center py-3 px-4">Básico</th>
                  <th className="text-center py-3 px-4">Avançado</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white/80">Número de questões</td>
                  <td className="text-center py-3 px-4">15</td>
                  <td className="text-center py-3 px-4">20</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white/80">Tempo estimado</td>
                  <td className="text-center py-3 px-4">10-15 min</td>
                  <td className="text-center py-3 px-4">20-25 min</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white/80">Nível de dificuldade</td>
                  <td className="text-center py-3 px-4">Fácil a Médio</td>
                  <td className="text-center py-3 px-4">Médio a Difícil</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white/80">Análise detalhada</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓ Completa</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white/80">Comparação com população</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓ Detalhada</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white/80">Certificado</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓ Premium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}