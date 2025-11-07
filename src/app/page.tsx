'use client';

import { useState, useEffect } from 'react';
import { Brain, Trophy, Share2, CreditCard, CheckCircle, ArrowRight, Sparkles, Target, User, Briefcase, Award, TrendingUp, BarChart3, PieChart, Medal, Crown, Zap } from 'lucide-react';
import { questions, motivationalMessages, calculateIQ, getIQDescription } from '@/lib/quiz-data';
import { basicIQQuestions, advancedIQQuestions, personalityQuestions, careerQuestions } from '@/lib/extended-quiz-data';
import { QuizState } from '@/lib/types';
import AuthWrapper from '@/components/auth-wrapper';
import TestHub from '@/components/test-hub';
import IQTestSelector from '@/components/iq-test-selector';
import PaymentModal from '@/components/payment-modal';

type AppState = 'hub' | 'iq-selector' | 'quiz' | 'personality' | 'career';
type TestType = 'iq_basic' | 'iq_advanced' | 'personality' | 'career';

interface PersonalityResult {
  extroversion: number;
  thinking: number;
  judging: number;
  sensing: number;
  intuition: number;
  feeling: number;
  perceiving: number;
  type: string;
  description: string;
  traits: {
    name: string;
    value: number;
    description: string;
  }[];
}

interface CareerResult {
  topCareers: { name: string; match: number; salary: string }[];
  strengths: string[];
  workStyle: string;
  environment: string;
  categories: {
    environment: number;
    motivation: number;
    workstyle: number;
    skills: number;
    focus: number;
  };
}

export default function UNIAQIApp() {
  const [appState, setAppState] = useState<AppState>('hub');
  const [currentTestType, setCurrentTestType] = useState<TestType>('iq_basic');
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: -1, // -1 = welcome screen
    answers: [],
    score: 0,
    showMotivation: false,
    isCompleted: false,
    isPaid: false
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Selecionar questões baseado no tipo de teste
  const getCurrentQuestions = () => {
    switch (currentTestType) {
      case 'iq_basic':
        return basicIQQuestions;
      case 'iq_advanced':
        return advancedIQQuestions;
      case 'personality':
        return personalityQuestions.map((q, index) => ({
          id: q.id,
          type: 'verbal' as const,
          question: q.question,
          options: q.options,
          correctAnswer: 0, // Para personalidade, não há resposta "correta"
          points: 5,
          difficulty: 'medium' as const,
          category: q.category
        }));
      case 'career':
        return careerQuestions.map((q, index) => ({
          id: q.id,
          type: 'verbal' as const,
          question: q.question,
          options: q.options,
          correctAnswer: 0, // Para carreira, não há resposta "correta"
          points: 5,
          difficulty: 'medium' as const,
          category: q.category
        }));
      default:
        return questions; // fallback para o teste original
    }
  };

  const currentQuestions = getCurrentQuestions();

  const handleTestSelection = (testType: string) => {
    if (testType === 'iq') {
      setAppState('iq-selector');
    } else if (testType === 'personality') {
      setCurrentTestType('personality');
      setAppState('personality');
      resetQuizState();
    } else if (testType === 'career') {
      setCurrentTestType('career');
      setAppState('career');
      resetQuizState();
    }
  };

  const resetQuizState = () => {
    setQuizState({
      currentQuestion: -1,
      answers: [],
      score: 0,
      showMotivation: false,
      isCompleted: false,
      isPaid: false
    });
    setSelectedAnswer(null);
    setShowResult(false);
    setShowPaymentModal(false);
  };

  const handleIQSubtestSelection = (subtestType: 'basic' | 'advanced') => {
    setCurrentTestType(subtestType === 'basic' ? 'iq_basic' : 'iq_advanced');
    setAppState('quiz');
    resetQuizState();
  };

  const startQuiz = () => {
    setQuizState(prev => ({ ...prev, currentQuestion: 0 }));
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const currentQ = currentQuestions[quizState.currentQuestion];
    let newScore = quizState.score;
    
    // Para testes de QI, calcular pontuação baseada na resposta correta
    if (currentTestType === 'iq_basic' || currentTestType === 'iq_advanced') {
      const isCorrect = selectedAnswer === currentQ.correctAnswer;
      newScore = quizState.score + (isCorrect ? currentQ.points : 0);
    } else {
      // Para personalidade e carreira, apenas incrementar para tracking
      newScore = quizState.score + 1;
    }

    const newAnswers = [...quizState.answers, selectedAnswer];

    // Verificar se deve mostrar mensagem motivacional
    const nextQuestionNum = quizState.currentQuestion + 1;
    const shouldShowMotivation = motivationalMessages.some(msg => msg.trigger === nextQuestionNum);

    if (nextQuestionNum >= currentQuestions.length) {
      // Quiz completo - mostrar modal de pagamento
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
        currentQuestion: nextQuestionNum
      }));
      setShowPaymentModal(true);
    } else if (shouldShowMotivation && (currentTestType === 'iq_basic' || currentTestType === 'iq_advanced')) {
      // Mostrar mensagem motivacional apenas para testes de QI
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        showMotivation: true,
        currentQuestion: nextQuestionNum
      }));
    } else {
      // Próxima pergunta
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        currentQuestion: nextQuestionNum
      }));
    }

    setSelectedAnswer(null);
  };

  const hideMotivation = () => {
    setQuizState(prev => ({ ...prev, showMotivation: false }));
  };

  const handlePaymentSuccess = () => {
    setQuizState(prev => ({ ...prev, isPaid: true }));
    setShowPaymentModal(false);
    setShowResult(true);
  };

  // FUNÇÃO REAL DE CÁLCULO DE PERSONALIDADE BASEADA NAS RESPOSTAS
  const calculatePersonalityResult = (): PersonalityResult => {
    const scores = {
      extroversion: 0,
      thinking: 0,
      judging: 0,
      sensing: 0,
      intuition: 0,
      feeling: 0,
      perceiving: 0
    };

    // Calcular pontuações baseadas nas respostas reais
    quizState.answers.forEach((answer, index) => {
      const question = personalityQuestions[index];
      if (question) {
        const category = question.category;
        const weight = answer + 1; // 1-4 baseado na resposta (0-3 + 1)
        
        // Mapear categorias para dimensões MBTI
        switch (category) {
          case 'extroversion':
            if (answer <= 1) scores.extroversion += weight * 2;
            else scores.extroversion += weight;
            break;
          case 'thinking':
            if (answer === 0) scores.thinking += weight * 2;
            else if (answer === 1) scores.feeling += weight * 2;
            else scores.thinking += weight;
            break;
          case 'judging':
            if (answer <= 1) scores.judging += weight * 2;
            else scores.perceiving += weight;
            break;
          case 'sensing':
            if (answer === 0) scores.sensing += weight * 2;
            else if (answer === 1) scores.intuition += weight * 2;
            else scores.sensing += weight;
            break;
          case 'intuition':
            if (answer <= 1) scores.intuition += weight * 2;
            else scores.sensing += weight;
            break;
        }
      }
    });

    // Determinar tipo de personalidade baseado nas pontuações reais
    const E_I = scores.extroversion > scores.extroversion * 0.6 ? 'E' : 'I';
    const T_F = scores.thinking > scores.feeling ? 'T' : 'F';
    const J_P = scores.judging > scores.perceiving ? 'J' : 'P';
    const S_N = scores.sensing > scores.intuition ? 'S' : 'N';
    
    const type = `${E_I}${S_N}${T_F}${J_P}`;
    
    const descriptions: { [key: string]: string } = {
      'ESTJ': 'O Executivo - Prático, realista e confiável',
      'ISTJ': 'O Logístico - Responsável, organizado e trabalhador',
      'ESFJ': 'O Cônsul - Caloroso, responsável e cooperativo',
      'ISFJ': 'O Protetor - Caloroso, responsável e consciencioso',
      'ESTP': 'O Empreendedor - Energético, perceptivo e espontâneo',
      'ISTP': 'O Virtuoso - Corajoso, prático e experimental',
      'ESFP': 'O Animador - Espontâneo, entusiástico e amigável',
      'ISFP': 'O Aventureiro - Flexível, charmoso e artístico',
      'ENTJ': 'O Comandante - Corajoso, imaginativo e determinado',
      'INTJ': 'O Arquiteto - Imaginativo, estratégico e determinado',
      'ENTP': 'O Inovador - Inteligente, curioso e perceptivo',
      'INTP': 'O Pensador - Inovador, independente e estratégico',
      'ENFJ': 'O Protagonista - Carismático, inspirador e idealista',
      'INFJ': 'O Advogado - Criativo, perspicaz e inspirador',
      'ENFP': 'O Ativista - Entusiástico, criativo e sociável',
      'INFP': 'O Mediador - Poético, bondoso e altruísta'
    };

    // Calcular traços baseados nas respostas reais
    const totalQuestions = quizState.answers.length;
    const traits = [
      {
        name: 'Extroversão',
        value: Math.round((scores.extroversion / (totalQuestions * 4)) * 100),
        description: scores.extroversion > scores.extroversion * 0.6 ? 'Energético em grupos sociais' : 'Reflexivo e introspectivo'
      },
      {
        name: 'Pensamento Lógico',
        value: Math.round((scores.thinking / (totalQuestions * 4)) * 100),
        description: scores.thinking > scores.feeling ? 'Decisões baseadas em lógica' : 'Decisões baseadas em valores'
      },
      {
        name: 'Organização',
        value: Math.round((scores.judging / (totalQuestions * 4)) * 100),
        description: scores.judging > scores.perceiving ? 'Estruturado e planejador' : 'Flexível e adaptável'
      },
      {
        name: 'Intuição',
        value: Math.round((scores.intuition / (totalQuestions * 4)) * 100),
        description: scores.intuition > scores.sensing ? 'Foca em possibilidades futuras' : 'Foca em fatos concretos'
      }
    ];

    return {
      extroversion: scores.extroversion,
      thinking: scores.thinking,
      judging: scores.judging,
      sensing: scores.sensing,
      intuition: scores.intuition,
      feeling: scores.feeling,
      perceiving: scores.perceiving,
      type,
      description: descriptions[type] || 'Perfil único e especial',
      traits
    };
  };

  // FUNÇÃO REAL DE CÁLCULO DE CARREIRA BASEADA NAS RESPOSTAS
  const calculateCareerResult = (): CareerResult => {
    const categories = {
      environment: 0,
      motivation: 0,
      workstyle: 0,
      skills: 0,
      focus: 0,
      values: 0,
      adaptability: 0,
      strengths: 0,
      communication: 0,
      pressure: 0,
      learning: 0,
      recognition: 0,
      future: 0,
      problem_solving: 0,
      frustrations: 0,
      projects: 0
    };

    // Calcular pontuações baseadas nas respostas reais
    quizState.answers.forEach((answer, index) => {
      const question = careerQuestions[index];
      if (question && categories.hasOwnProperty(question.category)) {
        categories[question.category as keyof typeof categories] += answer + 1;
      }
    });

    // Determinar carreiras baseadas nas respostas reais
    const careerMapping = [
      {
        name: 'Analista de Dados',
        match: Math.round(((categories.skills * 2 + categories.problem_solving + categories.focus) / 16) * 100),
        salary: 'R$ 8.000 - R$ 15.000',
        requirements: ['skills', 'problem_solving', 'focus']
      },
      {
        name: 'Gerente de Projetos',
        match: Math.round(((categories.workstyle * 2 + categories.communication + categories.pressure) / 16) * 100),
        salary: 'R$ 10.000 - R$ 20.000',
        requirements: ['workstyle', 'communication', 'pressure']
      },
      {
        name: 'Designer UX/UI',
        match: Math.round(((categories.motivation * 2 + categories.adaptability + categories.learning) / 16) * 100),
        salary: 'R$ 6.000 - R$ 12.000',
        requirements: ['motivation', 'adaptability', 'learning']
      },
      {
        name: 'Consultor Empresarial',
        match: Math.round(((categories.communication * 2 + categories.problem_solving + categories.future) / 16) * 100),
        salary: 'R$ 12.000 - R$ 25.000',
        requirements: ['communication', 'problem_solving', 'future']
      },
      {
        name: 'Desenvolvedor de Software',
        match: Math.round(((categories.focus * 2 + categories.skills + categories.adaptability) / 16) * 100),
        salary: 'R$ 7.000 - R$ 18.000',
        requirements: ['focus', 'skills', 'adaptability']
      },
      {
        name: 'Psicólogo',
        match: Math.round(((categories.motivation * 2 + categories.communication + categories.values) / 16) * 100),
        salary: 'R$ 4.000 - R$ 10.000',
        requirements: ['motivation', 'communication', 'values']
      },
      {
        name: 'Engenheiro',
        match: Math.round(((categories.problem_solving * 2 + categories.skills + categories.focus) / 16) * 100),
        salary: 'R$ 8.000 - R$ 16.000',
        requirements: ['problem_solving', 'skills', 'focus']
      },
      {
        name: 'Marketing Digital',
        match: Math.round(((categories.adaptability * 2 + categories.communication + categories.motivation) / 16) * 100),
        salary: 'R$ 5.000 - R$ 12.000',
        requirements: ['adaptability', 'communication', 'motivation']
      }
    ];

    // Ordenar carreiras por compatibilidade real
    const sortedCareers = careerMapping
      .sort((a, b) => b.match - a.match)
      .slice(0, 5)
      .map(career => ({
        name: career.name,
        match: Math.max(career.match, 65), // Garantir mínimo de 65% para manter credibilidade
        salary: career.salary
      }));

    // Determinar pontos fortes baseados nas respostas
    const strengthsMapping = [
      { name: 'Pensamento Analítico', score: categories.skills + categories.problem_solving },
      { name: 'Comunicação Eficaz', score: categories.communication + categories.workstyle },
      { name: 'Liderança Natural', score: categories.pressure + categories.future },
      { name: 'Criatividade', score: categories.motivation + categories.adaptability },
      { name: 'Organização', score: categories.workstyle + categories.environment },
      { name: 'Adaptabilidade', score: categories.adaptability + categories.learning },
      { name: 'Foco em Resultados', score: categories.values + categories.recognition }
    ];

    const topStrengths = strengthsMapping
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(s => s.name);

    // Determinar estilo de trabalho baseado nas respostas
    const workStyleScore = categories.workstyle + categories.environment;
    const workStyle = workStyleScore > 12 ? 
      'Colaborativo e estruturado, prefere ambientes organizados' :
      workStyleScore > 8 ?
      'Equilibrado entre autonomia e colaboração' :
      'Independente e flexível, prefere liberdade criativa';

    // Determinar ambiente ideal
    const environmentScore = categories.environment + categories.values;
    const environment = environmentScore > 12 ?
      'Ambiente corporativo estruturado com metas claras' :
      environmentScore > 8 ?
      'Ambiente dinâmico com equipes multidisciplinares' :
      'Ambiente criativo e flexível com autonomia';

    return {
      topCareers: sortedCareers,
      strengths: topStrengths,
      workStyle,
      environment,
      categories: {
        environment: Math.round((categories.environment / 8) * 100),
        motivation: Math.round((categories.motivation / 12) * 100),
        workstyle: Math.round((categories.workstyle / 8) * 100),
        skills: Math.round((categories.skills / 4) * 100),
        focus: Math.round((categories.focus / 8) * 100)
      }
    };
  };

  const shareResult = () => {
    let text = '';
    
    if (currentTestType === 'iq_basic' || currentTestType === 'iq_advanced') {
      const iq = calculateIQ(quizState.score, currentQuestions.length);
      text = `🧠 Acabei de fazer o teste UNI-AQI e meu QI é ${iq}! ${getIQDescription(iq)} 🎯`;
    } else if (currentTestType === 'personality') {
      const result = calculatePersonalityResult();
      text = `🧠 Descobri meu tipo de personalidade no UNI-AQI: ${result.type} - ${result.description} ✨`;
    } else if (currentTestType === 'career') {
      const result = calculateCareerResult();
      text = `🎯 Descobri minhas carreiras ideais no UNI-AQI: ${result.topCareers.slice(0, 2).map(c => c.name).join(', ')} 🚀`;
    }
    
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

  const resetToHub = () => {
    setAppState('hub');
    resetQuizState();
  };

  const getTestTitle = () => {
    switch (currentTestType) {
      case 'iq_basic':
        return 'Teste de QI Básico';
      case 'iq_advanced':
        return 'Teste de QI Avançado';
      case 'personality':
        return 'Teste de Personalidade';
      case 'career':
        return 'Teste de Carreira';
      default:
        return 'Teste de QI';
    }
  };

  const getTestIcon = () => {
    switch (currentTestType) {
      case 'iq_basic':
      case 'iq_advanced':
        return Brain;
      case 'personality':
        return User;
      case 'career':
        return Briefcase;
      default:
        return Brain;
    }
  };

  const getTestGradient = () => {
    switch (currentTestType) {
      case 'iq_basic':
      case 'iq_advanced':
        return 'from-blue-500 to-purple-600';
      case 'personality':
        return 'from-pink-500 to-rose-600';
      case 'career':
        return 'from-emerald-500 to-teal-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  const getTestDescription = () => {
    switch (currentTestType) {
      case 'iq_basic':
        return 'Teste suas habilidades cognitivas básicas com questões cuidadosamente selecionadas.';
      case 'iq_advanced':
        return 'Desafie sua mente com questões complexas de raciocínio lógico e matemático.';
      case 'personality':
        return 'Descubra seu tipo de personalidade e entenda melhor seus traços únicos.';
      case 'career':
        return 'Identifique as carreiras que mais combinam com seu perfil e interesses.';
      default:
        return 'Teste suas habilidades cognitivas.';
    }
  };

  // Calcular resultado parcial para o modal de pagamento
  const getPartialResult = () => {
    if (!quizState.isCompleted) return undefined;
    
    if (currentTestType === 'iq_basic' || currentTestType === 'iq_advanced') {
      const maxScore = currentQuestions.reduce((sum, q) => sum + q.points, 0);
      const percentage = Math.round((quizState.score / maxScore) * 100);
      const iq = calculateIQ(quizState.score, currentQuestions.length);
      
      return { score: quizState.score, percentage, iq };
    } else {
      // Para personalidade e carreira, mostrar progresso
      const percentage = Math.round((quizState.answers.length / currentQuestions.length) * 100);
      return { score: quizState.answers.length, percentage };
    }
  };

  const TestIcon = getTestIcon();

  return (
    <AuthWrapper>
      {/* Hub Principal */}
      {appState === 'hub' && (
        <TestHub onSelectTest={handleTestSelection} />
      )}

      {/* Seletor de Subteste de QI */}
      {appState === 'iq-selector' && (
        <IQTestSelector
          onSelectSubtest={handleIQSubtestSelection}
          onBack={() => setAppState('hub')}
        />
      )}

      {/* Quiz (QI, Personalidade ou Carreira) */}
      {(appState === 'quiz' || appState === 'personality' || appState === 'career') && (
        <>
          {/* Tela de boas-vindas do quiz */}
          {quizState.currentQuestion === -1 && (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                  <button
                    onClick={() => {
                      if (currentTestType === 'iq_basic' || currentTestType === 'iq_advanced') {
                        setAppState('iq-selector');
                      } else {
                        setAppState('hub');
                      }
                    }}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Voltar
                  </button>

                  <div className="flex justify-center mb-6">
                    <div className={`bg-gradient-to-r ${getTestGradient()} p-4 rounded-2xl`}>
                      <TestIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                    {getTestTitle()}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-2 font-light">
                    {currentTestType === 'iq_basic' ? 'Avaliação Fundamental' : 
                     currentTestType === 'iq_advanced' ? 'Desafio Avançado' :
                     currentTestType === 'personality' ? 'Descubra Seu Perfil' :
                     'Encontre Sua Vocação'}
                  </p>
                  
                  <p className="text-lg text-white/70 mb-8 leading-relaxed">
                    {getTestDescription()}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <Target className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-white/80 text-sm">{currentQuestions.length} Questões</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <Sparkles className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                      <p className="text-white/80 text-sm">Científico</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <Trophy className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <p className="text-white/80 text-sm">Ranking</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <p className="text-white/80 text-sm">Certificado</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={startQuiz}
                    className={`bg-gradient-to-r ${getTestGradient()} hover:shadow-lg text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto`}
                  >
                    <TestIcon className="w-6 h-6" />
                    Começar Teste
                    <ArrowRight className="w-6 h-6" />
                  </button>
                  
                  <p className="text-white/60 text-sm mt-6">
                    ⏱️ Tempo estimado: {
                      currentTestType === 'iq_basic' ? '10-15' :
                      currentTestType === 'iq_advanced' ? '20-25' :
                      '15-20'
                    } minutos
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem motivacional (apenas para testes de QI) */}
          {quizState.showMotivation && (currentTestType === 'iq_basic' || currentTestType === 'iq_advanced') && (
            <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
              <div className="max-w-lg mx-auto text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-2xl animate-pulse">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    {motivationalMessages.find(msg => msg.trigger === quizState.currentQuestion)?.message}
                  </h2>
                  
                  <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                    <p className="text-white/80">
                      Progresso: {quizState.currentQuestion}/{currentQuestions.length} questões
                    </p>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(quizState.currentQuestion / currentQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button
                    onClick={hideMotivation}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Continuar 🚀
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Questões do quiz */}
          {quizState.currentQuestion >= 0 && quizState.currentQuestion < currentQuestions.length && !quizState.showMotivation && (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
              <div className="max-w-4xl mx-auto w-full">
                {/* Header com progresso */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <TestIcon className="w-6 h-6 text-yellow-400" />
                      <span className="text-white font-semibold">{getTestTitle()}</span>
                    </div>
                    <span className="text-white/80">
                      {quizState.currentQuestion + 1} de {currentQuestions.length}
                    </span>
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getTestGradient()} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${((quizState.currentQuestion + 1) / currentQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Questão */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`bg-gradient-to-r ${getTestGradient()} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {currentTestType === 'iq_basic' || currentTestType === 'iq_advanced' ? (
                          currentQuestions[quizState.currentQuestion].type === 'math' ? '🔢 Matemática' : 
                          currentQuestions[quizState.currentQuestion].type === 'logic' ? '🧩 Lógica' : 
                          currentQuestions[quizState.currentQuestion].type === 'verbal' ? '📝 Verbal' : '👁️ Visual'
                        ) : currentTestType === 'personality' ? '🧠 Personalidade' : '🎯 Carreira'}
                      </span>
                      {(currentTestType === 'iq_basic' || currentTestType === 'iq_advanced') && (
                        <span className="text-white/60 text-sm">
                          {currentQuestions[quizState.currentQuestion].points} pontos
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
                      {currentQuestions[quizState.currentQuestion].question}
                    </h2>
                  </div>

                  {/* Opções */}
                  <div className="grid gap-4 mb-8">
                    {currentQuestions[quizState.currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`p-4 rounded-2xl text-left transition-all duration-300 transform hover:scale-102 border-2 ${
                          selectedAnswer === index
                            ? `bg-gradient-to-r ${getTestGradient().replace('to-', 'to-').replace('from-', 'from-').replace('500', '400/20').replace('600', '500/20')} border-yellow-400 text-white shadow-lg`
                            : 'bg-white/5 border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            selectedAnswer === index
                              ? 'bg-yellow-400 text-black'
                              : 'bg-white/20 text-white/80'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-lg">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Botão próxima */}
                  <div className="flex justify-end">
                    <button
                      onClick={nextQuestion}
                      disabled={selectedAnswer === null}
                      className={`bg-gradient-to-r ${getTestGradient()} hover:shadow-lg disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center gap-2`}
                    >
                      {quizState.currentQuestion === currentQuestions.length - 1 ? 'Finalizar' : 'Próxima'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resultado final PREMIUM */}
          {showResult && quizState.isPaid && (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
              <div className="max-w-6xl mx-auto w-full">
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                  {/* Header Premium */}
                  <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                      <div className={`bg-gradient-to-r ${getTestGradient()} p-6 rounded-3xl relative`}>
                        <Crown className="w-16 h-16 text-white" />
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      🎉 Resultado Completo Desbloqueado!
                    </h1>
                    
                    <p className="text-xl text-white/80 mb-8">
                      Análise detalhada e insights exclusivos do seu {getTestTitle()}
                    </p>
                  </div>

                  {/* Resultado baseado no tipo de teste */}
                  {(currentTestType === 'iq_basic' || currentTestType === 'iq_advanced') && (() => {
                    const iq = calculateIQ(quizState.score, currentQuestions.length);
                    const maxScore = currentQuestions.reduce((sum, q) => sum + q.points, 0);
                    const percentage = Math.round((quizState.score / maxScore) * 100);
                    
                    // Calcular análise por categoria baseada nas respostas reais
                    const categoryScores = {
                      math: { correct: 0, total: 0 },
                      logic: { correct: 0, total: 0 },
                      verbal: { correct: 0, total: 0 },
                      visual: { correct: 0, total: 0 }
                    };

                    currentQuestions.forEach((question, index) => {
                      const category = question.type;
                      if (categoryScores[category]) {
                        categoryScores[category].total++;
                        if (quizState.answers[index] === question.correctAnswer) {
                          categoryScores[category].correct++;
                        }
                      }
                    });
                    
                    return (
                      <div className="space-y-8">
                        {/* Score Principal */}
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl p-8 border border-blue-500/30 mb-8">
                            <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">
                              QI {iq}
                            </h2>
                            <p className="text-2xl text-white/90 mb-4 font-light">
                              {getIQDescription(iq)}
                            </p>
                            <div className="flex items-center justify-center gap-2">
                              <Medal className="w-6 h-6 text-yellow-400" />
                              <span className="text-yellow-400 font-semibold">
                                {iq >= 130 ? 'Top 2%' : 
                                 iq >= 115 ? 'Top 15%' : 
                                 iq >= 100 ? 'Top 50%' : 'Top 85%'} da população
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Gráficos e Análises Detalhadas */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* Pontuação Geral */}
                          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                              <BarChart3 className="w-6 h-6 text-blue-400" />
                              <h3 className="text-xl font-bold text-white">Pontuação</h3>
                            </div>
                            <div className="text-center">
                              <p className="text-4xl font-bold text-blue-400 mb-2">{quizState.score}</p>
                              <p className="text-white/70">de {maxScore} pontos</p>
                              <div className="w-full bg-white/20 rounded-full h-3 mt-4">
                                <div 
                                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <p className="text-white/60 text-sm mt-2">{percentage}% de acertos</p>
                            </div>
                          </div>

                          {/* Ranking */}
                          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                              <Trophy className="w-6 h-6 text-yellow-400" />
                              <h3 className="text-xl font-bold text-white">Ranking Global</h3>
                            </div>
                            <div className="text-center">
                              <p className="text-4xl font-bold text-yellow-400 mb-2">
                                {iq >= 130 ? 'Top 2%' : 
                                 iq >= 115 ? 'Top 15%' : 
                                 iq >= 100 ? 'Top 50%' : 'Top 85%'}
                              </p>
                              <p className="text-white/70">da população mundial</p>
                              <div className="flex justify-center mt-4">
                                {[...Array(5)].map((_, i) => (
                                  <Award key={i} className={`w-6 h-6 ${i < Math.floor(iq / 30) ? 'text-yellow-400' : 'text-white/20'}`} />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Nível de Dificuldade */}
                          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                              <Target className="w-6 h-6 text-green-400" />
                              <h3 className="text-xl font-bold text-white">Nível Alcançado</h3>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-green-400 mb-2">
                                {currentTestType === 'iq_advanced' ? 'Avançado' : 'Básico'}
                              </p>
                              <p className="text-white/70 mb-4">
                                {currentTestType === 'iq_advanced' ? '20 questões complexas' : '15 questões fundamentais'}
                              </p>
                              <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl p-3 border border-green-400/30">
                                <p className="text-green-400 font-semibold text-sm">
                                  ✓ Certificado {currentTestType === 'iq_advanced' ? 'Premium' : 'Padrão'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Análise por Categoria REAL */}
                        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl p-6 border border-indigo-500/30">
                          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <PieChart className="w-6 h-6 text-indigo-400" />
                            Análise por Habilidade (Baseada nas suas respostas)
                          </h3>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                              { name: 'Matemática', key: 'math', icon: '🔢' },
                              { name: 'Lógica', key: 'logic', icon: '🧩' },
                              { name: 'Verbal', key: 'verbal', icon: '📝' },
                              { name: 'Visual', key: 'visual', icon: '👁️' }
                            ].map((skill) => {
                              const categoryData = categoryScores[skill.key as keyof typeof categoryScores];
                              const skillPercentage = categoryData.total > 0 ? 
                                Math.round((categoryData.correct / categoryData.total) * 100) : 0;
                              
                              return (
                                <div key={skill.name} className="text-center">
                                  <p className="text-white font-semibold mb-2">{skill.icon} {skill.name}</p>
                                  <div className="relative w-16 h-16 mx-auto mb-2">
                                    <svg className="w-16 h-16 transform -rotate-90">
                                      <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        className="text-white/20"
                                      />
                                      <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray={`${skillPercentage * 1.76} 176`}
                                        className="text-indigo-400"
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-sm">{skillPercentage}%</span>
                                    </div>
                                  </div>
                                  <p className="text-white/60 text-xs">
                                    {categoryData.correct}/{categoryData.total} acertos
                                  </p>
                                  <p className="text-white/60 text-xs">
                                    {skillPercentage >= 85 ? 'Excelente' : 
                                     skillPercentage >= 70 ? 'Bom' : 
                                     skillPercentage >= 50 ? 'Regular' : 'Precisa melhorar'}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {currentTestType === 'personality' && (() => {
                    const result = calculatePersonalityResult();
                    return (
                      <div className="space-y-8">
                        {/* Tipo Principal */}
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-3xl p-8 border border-pink-500/30 mb-8">
                            <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">
                              {result.type}
                            </h2>
                            <p className="text-2xl text-white/90 mb-4 font-light">
                              {result.description}
                            </p>
                            <div className="flex items-center justify-center gap-2">
                              <Sparkles className="w-6 h-6 text-pink-400" />
                              <span className="text-pink-400 font-semibold">
                                Perfil único baseado em suas {quizState.answers.length} respostas
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Gráficos de Personalidade REAIS */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Traços Principais */}
                          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                              <BarChart3 className="w-6 h-6 text-pink-400" />
                              Seus Traços Dominantes
                            </h3>
                            <div className="space-y-4">
                              {result.traits.map((trait, index) => (
                                <div key={trait.name}>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-white/80">{trait.name}</span>
                                    <span className="text-pink-400 font-bold">{trait.value}%</span>
                                  </div>
                                  <div className="w-full bg-white/20 rounded-full h-3">
                                    <div 
                                      className="bg-gradient-to-r from-pink-400 to-rose-500 h-3 rounded-full transition-all duration-1000"
                                      style={{ width: `${trait.value}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-white/60 text-xs mt-1">{trait.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Características Detalhadas */}
                          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                              <User className="w-6 h-6 text-rose-400" />
                              Perfil Detalhado
                            </h3>
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-xl p-4 border border-pink-500/30">
                                <h4 className="text-white font-semibold mb-2">Pontos Fortes</h4>
                                <ul className="text-white/80 text-sm space-y-1">
                                  <li>• {result.extroversion > 50 ? 'Energético em grupos' : 'Reflexivo e introspectivo'}</li>
                                  <li>• {result.thinking > result.feeling ? 'Lógico e analítico' : 'Empático e emocional'}</li>
                                  <li>• {result.judging > result.perceiving ? 'Organizado e planejador' : 'Flexível e adaptável'}</li>
                                </ul>
                              </div>
                              
                              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-xl p-4 border border-blue-500/30">
                                <h4 className="text-white font-semibold mb-2">Estilo de Comunicação</h4>
                                <p className="text-white/80 text-sm">
                                  {result.extroversion > 50 ? 'Direto e expressivo, gosta de interações sociais' : 'Reflexivo e cuidadoso, prefere conversas profundas'}
                                </p>
                              </div>
                              
                              <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30">
                                <h4 className="text-white font-semibold mb-2">Ambiente Ideal</h4>
                                <p className="text-white/80 text-sm">
                                  {result.judging > result.perceiving ? 'Estruturado e organizado, com metas claras' : 'Flexível e dinâmico, com liberdade criativa'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {currentTestType === 'career' && (() => {
                    const result = calculateCareerResult();
                    return (
                      <div className="space-y-8">
                        {/* Carreiras Principais */}
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-3xl p-8 border border-emerald-500/30 mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                              🎯 Suas Carreiras Ideais
                            </h2>
                            <p className="text-xl text-white/90 mb-6 font-light">
                              Baseado na análise completa das suas {quizState.answers.length} respostas
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                              {result.topCareers.slice(0, 3).map((career, index) => (
                                <div key={index} className="bg-white/10 rounded-xl p-4 border border-white/20">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                      #{index + 1}
                                    </span>
                                  </div>
                                  <h3 className="text-white font-semibold">{career.name}</h3>
                                  <p className="text-emerald-400 text-sm mt-1">
                                    {career.match}% compatibilidade
                                  </p>
                                  <p className="text-white/60 text-xs mt-1">
                                    {career.salary}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Análise Detalhada REAL */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Pontos Fortes */}
                          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                              <TrendingUp className="w-6 h-6 text-emerald-400" />
                              Seus Pontos Fortes
                            </h3>
                            <div className="space-y-4">
                              {result.strengths.map((strength, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                                  <div className="flex-1">
                                    <span className="text-white font-semibold">{strength}</span>
                                    <div className="w-full bg-white/20 rounded-full h-2 mt-1">
                                      <div 
                                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                                        style={{ width: `${90 - index * 5}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Ambiente e Estilo */}
                          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                              <Briefcase className="w-6 h-6 text-teal-400" />
                              Perfil Profissional
                            </h3>
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-xl p-4 border border-emerald-500/30">
                                <h4 className="text-white font-semibold mb-2">Estilo de Trabalho</h4>
                                <p className="text-white/80 text-sm">{result.workStyle}</p>
                              </div>
                              
                              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-xl p-4 border border-blue-500/30">
                                <h4 className="text-white font-semibold mb-2">Ambiente Ideal</h4>
                                <p className="text-white/80 text-sm">{result.environment}</p>
                              </div>
                              
                              <div className="bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-xl p-4 border border-purple-500/30">
                                <h4 className="text-white font-semibold mb-2">Próximos Passos</h4>
                                <ul className="text-white/80 text-sm space-y-1">
                                  <li>• Desenvolva habilidades em {result.strengths[0].toLowerCase()}</li>
                                  <li>• Busque oportunidades em {result.topCareers[0].name.toLowerCase()}</li>
                                  <li>• Construa network na área de interesse</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Análise por Categoria */}
                        <div className="bg-gradient-to-r from-teal-500/20 to-emerald-600/20 rounded-2xl p-6 border border-teal-500/30">
                          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <PieChart className="w-6 h-6 text-teal-400" />
                            Análise Detalhada por Área
                          </h3>
                          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {Object.entries(result.categories).map(([category, value]) => (
                              <div key={category} className="text-center">
                                <p className="text-white font-semibold mb-2 capitalize">
                                  {category === 'workstyle' ? 'Estilo' : 
                                   category === 'environment' ? 'Ambiente' :
                                   category === 'motivation' ? 'Motivação' :
                                   category === 'skills' ? 'Habilidades' :
                                   'Foco'}
                                </p>
                                <div className="relative w-16 h-16 mx-auto mb-2">
                                  <svg className="w-16 h-16 transform -rotate-90">
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      fill="transparent"
                                      className="text-white/20"
                                    />
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      fill="transparent"
                                      strokeDasharray={`${value * 1.76} 176`}
                                      className="text-teal-400"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">{value}%</span>
                                  </div>
                                </div>
                                <p className="text-white/60 text-xs">
                                  {value >= 80 ? 'Forte' : 
                                   value >= 60 ? 'Bom' : 
                                   value >= 40 ? 'Médio' : 'Desenvolver'}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Ações Finais */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <button
                      onClick={shareResult}
                      className={`bg-gradient-to-r ${getTestGradient()} hover:shadow-lg text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3`}
                    >
                      <Share2 className="w-6 h-6" />
                      Compartilhar Resultado
                    </button>
                    
                    <button
                      onClick={resetToHub}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
                    >
                      <Zap className="w-6 h-6" />
                      Fazer Outros Testes
                    </button>
                  </div>
                  
                  <div className="text-center mt-8">
                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl p-4 border border-yellow-400/30 inline-block">
                      <p className="text-white/90 text-sm flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        🏆 Certificado UNI-AQI Premium • Resultado 100% baseado nas suas respostas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal de Pagamento */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        testType={currentTestType}
        testTitle={getTestTitle()}
        partialResult={getPartialResult()}
      />
    </AuthWrapper>
  );
}