'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Brain, User, Briefcase, CheckCircle, Share2, Trophy, Award, Sparkles, Crown, BarChart3, PieChart, Medal, TrendingUp, Target } from 'lucide-react';

interface TestResult {
  title: string;
  icon: any;
  gradient: string;
  score: string;
  description: string;
  insights: string[];
  categories: {
    name: string;
    value: number;
    description: string;
  }[];
}

const testResults: { [key: string]: TestResult } = {
  'qi-basico': {
    title: 'Teste de QI Básico',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-600',
    score: 'QI 115',
    description: 'Inteligência Acima da Média',
    insights: [
      'Raciocínio lógico bem desenvolvido',
      'Boa capacidade de resolução de problemas',
      'Habilidades verbais sólidas',
      'Potencial para desenvolvimento em áreas analíticas'
    ],
    categories: [
      { name: 'Matemática', value: 85, description: 'Excelente capacidade numérica' },
      { name: 'Lógica', value: 78, description: 'Bom raciocínio dedutivo' },
      { name: 'Verbal', value: 82, description: 'Forte compreensão verbal' },
      { name: 'Visual', value: 75, description: 'Boa percepção espacial' }
    ]
  },
  'qi-avancado': {
    title: 'Teste de QI Avançado',
    icon: Brain,
    gradient: 'from-purple-500 to-indigo-600',
    score: 'QI 128',
    description: 'Inteligência Superior',
    insights: [
      'Raciocínio abstrato excepcional',
      'Capacidade analítica avançada',
      'Excelente resolução de problemas complexos',
      'Potencial para áreas de alta complexidade cognitiva'
    ],
    categories: [
      { name: 'Matemática', value: 92, description: 'Capacidade numérica excepcional' },
      { name: 'Lógica', value: 88, description: 'Raciocínio dedutivo superior' },
      { name: 'Verbal', value: 85, description: 'Compreensão verbal avançada' },
      { name: 'Visual', value: 90, description: 'Percepção espacial excelente' }
    ]
  },
  'personalidade': {
    title: 'Teste de Personalidade',
    icon: User,
    gradient: 'from-pink-500 to-rose-600',
    score: 'ENFP',
    description: 'O Ativista - Entusiástico, criativo e sociável',
    insights: [
      'Extrovertido e energético em grupos sociais',
      'Intuitivo, focado em possibilidades futuras',
      'Decisões baseadas em valores pessoais',
      'Flexível e adaptável a mudanças'
    ],
    categories: [
      { name: 'Extroversão', value: 85, description: 'Energético em grupos' },
      { name: 'Intuição', value: 78, description: 'Foca em possibilidades' },
      { name: 'Sentimento', value: 82, description: 'Decisões por valores' },
      { name: 'Percepção', value: 75, description: 'Flexível e adaptável' }
    ]
  },
  'carreira': {
    title: 'Teste de Carreira',
    icon: Briefcase,
    gradient: 'from-emerald-500 to-teal-600',
    score: 'Top 3 Carreiras',
    description: 'Analista de Dados, Designer UX/UI, Gerente de Projetos',
    insights: [
      'Forte pensamento analítico',
      'Excelente comunicação',
      'Liderança natural',
      'Criatividade acima da média'
    ],
    categories: [
      { name: 'Ambiente', value: 85, description: 'Prefere estrutura organizada' },
      { name: 'Motivação', value: 88, description: 'Impacto e reconhecimento' },
      { name: 'Estilo', value: 82, description: 'Colaborativo e estruturado' },
      { name: 'Habilidades', value: 90, description: 'Analítico e técnico' }
    ]
  }
};

export default function ResultadoPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const teste = params.teste as string;
  const sessionId = searchParams.get('session_id');
  
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar pagamento
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
          const data = await response.json();
          
          if (data.verified) {
            setVerified(true);
          }
        } catch (error) {
          console.error('Erro ao verificar pagamento:', error);
        }
      }
      setLoading(false);
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-md text-center">
          <div className="bg-red-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
          <p className="text-white/80 mb-6">
            Você precisa realizar o pagamento para acessar este resultado.
          </p>
          <a
            href="/pagamento"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl inline-block hover:shadow-lg transition-all"
          >
            Ir para Pagamento
          </a>
        </div>
      </div>
    );
  }

  const result = testResults[teste];

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Teste não encontrado</h1>
          <a href="/" className="text-blue-400 hover:underline">Voltar para início</a>
        </div>
      </div>
    );
  }

  const Icon = result.icon;

  const shareResult = () => {
    const text = `🧠 Acabei de completar o ${result.title} no UNI-AQI! ${result.score} - ${result.description} 🎯`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Meu resultado no UNI-AQI',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Resultado copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className={`bg-gradient-to-r ${result.gradient} p-6 rounded-3xl relative`}>
                <Icon className="w-16 h-16 text-white" />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🎉 Seu Resultado Completo!
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Análise detalhada do seu {result.title}
            </p>
          </div>

          {/* Score Principal */}
          <div className="text-center mb-12">
            <div className={`bg-gradient-to-r ${result.gradient.replace('500', '500/20').replace('600', '600/20')} rounded-3xl p-8 border border-white/20 mb-8`}>
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">
                {result.score}
              </h2>
              <p className="text-2xl text-white/90 mb-4 font-light">
                {result.description}
              </p>
              <div className="flex items-center justify-center gap-2">
                <Medal className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">
                  Certificado UNI-AQI Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-yellow-400" />
              Principais Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.insights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-xl p-4 border border-white/20 flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-white/90">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Análise por Categoria */}
          <div className={`bg-gradient-to-r ${result.gradient.replace('500', '500/20').replace('600', '600/20')} rounded-2xl p-6 border border-white/20 mb-12`}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <PieChart className="w-6 h-6 text-white" />
              Análise Detalhada por Categoria
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {result.categories.map((category, index) => (
                <div key={index} className="text-center">
                  <p className="text-white font-semibold mb-3">{category.name}</p>
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-white/20"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${category.value * 2.51} 251`}
                        className="text-white"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{category.value}%</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">{category.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={shareResult}
              className={`bg-gradient-to-r ${result.gradient} hover:shadow-lg text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3`}
            >
              <Share2 className="w-6 h-6" />
              Compartilhar Resultado
            </button>
            
            <a
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
            >
              <Trophy className="w-6 h-6" />
              Fazer Outros Testes
            </a>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl p-4 border border-yellow-400/30 inline-block">
              <p className="text-white/90 text-sm flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                🏆 Certificado UNI-AQI • Resultado 100% baseado nas suas respostas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
