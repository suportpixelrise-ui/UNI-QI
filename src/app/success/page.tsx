'use client';

export const dynamic = "force-dynamic";
export const revalidate = 0;


import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');
  const testType = searchParams.get('test_type');

  useEffect(() => {
    if (!sessionId || !testType) {
      setError('Informações de pagamento ausentes');
      setLoading(false);
      return;
    }

    // Simular verificação do pagamento
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [sessionId, testType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Processando seu pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-pink-900 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="bg-red-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Erro no Pagamento</h1>
            <p className="text-white/80 mb-6">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎉 Pagamento Confirmado!
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            Seu acesso ao resultado completo foi liberado com sucesso!
          </p>
          
          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <h2 className="text-white font-semibold mb-4">O que você desbloqueou:</h2>
            <ul className="text-white/80 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                Análise completa e detalhada do seu teste
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                Gráficos e insights exclusivos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                Certificado digital UNI-AQI Premium
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                Acesso permanente aos seus resultados
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-green-400 to-emerald-500 hover:shadow-lg text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
          >
            Ver Meu Resultado Completo
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-white/60 text-sm mt-6">
            Um recibo foi enviado para o seu e-mail
          </p>
        </div>
      </div>
    </div>
  );
}
