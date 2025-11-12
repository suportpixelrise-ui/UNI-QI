'use client';

import { useSearchParams } from 'next/navigation';
import { Brain, User, Briefcase, CheckCircle, Lock, Clock, Award, ArrowRight, Sparkles } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  icon: any;
  price: string;
  paymentLink: string;
  description: string;
  gradient: string;
  features: string[];
}

const tests: { [key: string]: Test } = {
  'qi-basico': {
    id: 'qi-basico',
    name: 'QI Básico',
    icon: Brain,
    price: 'R$ 9,90',
    paymentLink: 'https://buy.stripe.com/8x28wHarX6yDdE70ZPdwc02',
    description: 'Avaliação simples de raciocínio lógico e agilidade mental.',
    gradient: 'from-blue-500 to-cyan-600',
    features: ['15 questões fundamentais', 'Análise de QI básica', 'Certificado padrão']
  },
  'qi-avancado': {
    id: 'qi-avancado',
    name: 'QI Avançado',
    icon: Brain,
    price: 'R$ 14,90',
    paymentLink: 'https://buy.stripe.com/4gM8wH57D0af1VpaApdwc01',
    description: 'Versão completa do teste de QI, com questões mais complexas e análise detalhada.',
    gradient: 'from-purple-500 to-indigo-600',
    features: ['20 questões complexas', 'Análise completa por categoria', 'Certificado premium']
  },
  'personalidade': {
    id: 'personalidade',
    name: 'Personalidade',
    icon: User,
    price: 'R$ 14,90',
    paymentLink: 'https://buy.stripe.com/4gM8wH57D0af1VpaApdwc01',
    description: 'Avaliação de perfil comportamental e traços de personalidade.',
    gradient: 'from-pink-500 to-rose-600',
    features: ['Tipo MBTI completo', 'Análise de traços', 'Guia de desenvolvimento']
  },
  'carreira': {
    id: 'carreira',
    name: 'Carreira',
    icon: Briefcase,
    price: 'R$ 19,90',
    paymentLink: 'https://buy.stripe.com/8x2cMX6bH9KP1VpaApdwc00',
    description: 'Módulo voltado para autoconhecimento profissional e direcionamento de carreira.',
    gradient: 'from-emerald-500 to-teal-600',
    features: ['Top 5 carreiras ideais', 'Análise de pontos fortes', 'Plano de desenvolvimento']
  }
};

export default function PagamentoPage() {
  const searchParams = useSearchParams();
  const testeId = searchParams.get('teste') || 'qi-basico';
  
  const test = tests[testeId];

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Teste não encontrado</h1>
          <a href="/" className="text-blue-400 hover:underline">Voltar para início</a>
        </div>
      </div>
    );
  }

  const Icon = test.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Seu resultado está pronto! 🔍
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Descubra agora o que o teste revelou sobre você — análise personalizada, insights exclusivos e pontuação detalhada.
          </p>
        </div>

        {/* Card do Teste */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className={`bg-gradient-to-r ${test.gradient} p-3 rounded-xl`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">Valor</p>
              <p className="text-4xl font-bold text-white">{test.price}</p>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-3">{test.name}</h3>
          <p className="text-white/70 mb-6 text-lg">{test.description}</p>

          <div className="space-y-3 mb-8">
            {test.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </div>

          <a
            href={test.paymentLink}
            className={`w-full bg-gradient-to-r ${test.gradient} hover:shadow-2xl text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg`}
          >
            Liberar resultado
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>

        {/* Gatilhos de Conversão */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-white/90 text-sm font-semibold mb-1">90% Pronto</p>
            <p className="text-white/60 text-xs">Seu resultado está 90% pronto — falta só liberar a visualização.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-white/90 text-sm font-semibold mb-1">100% Seguro</p>
            <p className="text-white/60 text-xs">Pagamento 100% seguro via Stripe.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-white/90 text-sm font-semibold mb-1">Tempo Limitado</p>
            <p className="text-white/60 text-xs">Oferta válida por tempo limitado.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-white/90 text-sm font-semibold mb-1">10 Mil Análises</p>
            <p className="text-white/60 text-xs">Baseado em mais de 10 mil análises.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl p-6 border border-yellow-400/30 inline-block">
            <p className="text-white/90 text-sm flex items-center gap-2">
              <Lock className="w-5 h-5 text-yellow-400" />
              Pagamento processado de forma segura pela Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
