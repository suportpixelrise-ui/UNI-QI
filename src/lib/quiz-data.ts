import { Question, MotivationalMessage } from './types';

export const questions: Question[] = [
  {
    id: 1,
    type: 'math',
    question: 'Se 2x + 5 = 13, qual é o valor de x?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 2,
    type: 'logic',
    question: 'Complete a sequência: 2, 4, 8, 16, ?',
    options: ['24', '28', '32', '36'],
    correctAnswer: 2,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 3,
    type: 'verbal',
    question: 'Qual palavra não pertence ao grupo?',
    options: ['Cachorro', 'Gato', 'Pássaro', 'Mesa'],
    correctAnswer: 3,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 4,
    type: 'math',
    question: 'Qual é 15% de 200?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 5,
    type: 'logic',
    question: 'Se todos os A são B, e alguns B são C, então:',
    options: ['Todos os A são C', 'Alguns A são C', 'Nenhum A é C', 'Não é possível determinar'],
    correctAnswer: 3,
    points: 7,
    difficulty: 'medium'
  },
  {
    id: 6,
    type: 'visual',
    question: 'Quantos triângulos você consegue ver na figura? (Imagine um triângulo grande dividido em 9 triângulos menores)',
    options: ['9', '13', '16', '18'],
    correctAnswer: 1,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 7,
    type: 'verbal',
    question: 'LIVRO está para LEITURA assim como PIANO está para:',
    options: ['Música', 'Teclas', 'Som', 'Instrumento'],
    correctAnswer: 0,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 8,
    type: 'math',
    question: 'Se um trem viaja a 80 km/h por 2,5 horas, qual distância percorreu?',
    options: ['160 km', '180 km', '200 km', '220 km'],
    correctAnswer: 2,
    points: 7,
    difficulty: 'medium'
  },
  {
    id: 9,
    type: 'logic',
    question: 'Complete: 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '13', '15', '16'],
    correctAnswer: 1,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 10,
    type: 'verbal',
    question: 'Qual é o antônimo de EFÊMERO?',
    options: ['Duradouro', 'Rápido', 'Temporário', 'Breve'],
    correctAnswer: 0,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 11,
    type: 'math',
    question: 'Se x² - 5x + 6 = 0, quais são os valores de x?',
    options: ['2 e 3', '1 e 6', '2 e 4', '1 e 5'],
    correctAnswer: 0,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 12,
    type: 'logic',
    question: 'Em uma sala há 4 pessoas. Cada uma cumprimenta todas as outras uma vez. Quantos cumprimentos acontecem?',
    options: ['8', '12', '6', '16'],
    correctAnswer: 2,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 13,
    type: 'visual',
    question: 'Qual figura completa a sequência? ○ △ □ ○ △ ?',
    options: ['○', '△', '□', '◇'],
    correctAnswer: 2,
    points: 7,
    difficulty: 'medium'
  },
  {
    id: 14,
    type: 'verbal',
    question: 'MÉDICO está para HOSPITAL assim como PROFESSOR está para:',
    options: ['Aluno', 'Escola', 'Ensino', 'Conhecimento'],
    correctAnswer: 1,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 15,
    type: 'math',
    question: 'Qual é o próximo número primo após 17?',
    options: ['18', '19', '20', '21'],
    correctAnswer: 1,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 16,
    type: 'logic',
    question: 'Se é verdade que "Todos os gatos são mamíferos" e "Alguns mamíferos voam", podemos concluir que:',
    options: ['Todos os gatos voam', 'Alguns gatos voam', 'Nenhum gato voa', 'Não podemos concluir nada sobre gatos voarem'],
    correctAnswer: 3,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 17,
    type: 'verbal',
    question: 'Qual palavra pode ser formada com as letras de AMOR?',
    options: ['ROMA', 'RAMO', 'MORA', 'Todas as anteriores'],
    correctAnswer: 3,
    points: 7,
    difficulty: 'medium'
  },
  {
    id: 18,
    type: 'math',
    question: 'Se log₂(x) = 3, qual é o valor de x?',
    options: ['6', '8', '9', '12'],
    correctAnswer: 1,
    points: 10,
    difficulty: 'hard'
  },
  {
    id: 19,
    type: 'logic',
    question: 'Quantos cubos pequenos formam um cubo 3x3x3?',
    options: ['9', '18', '27', '36'],
    correctAnswer: 2,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 20,
    type: 'verbal',
    question: 'Complete a analogia: ÁGUA está para SEDE assim como COMIDA está para:',
    options: ['Fome', 'Sabor', 'Nutrição', 'Digestão'],
    correctAnswer: 0,
    points: 6,
    difficulty: 'medium'
  }
];

export const motivationalMessages: MotivationalMessage[] = [
  {
    id: 1,
    message: "🧠 Fantástico! Você está demonstrando uma mente afiada!",
    trigger: 5
  },
  {
    id: 2,
    message: "⚡ Incrível! Continue assim, você está indo muito bem!",
    trigger: 10
  },
  {
    id: 3,
    message: "🎯 Excelente raciocínio! Você está quase chegando ao final!",
    trigger: 15
  },
  {
    id: 4,
    message: "🏆 Parabéns! Você completou todas as questões com sucesso!",
    trigger: 20
  }
];

export const calculateIQ = (score: number, totalQuestions: number): number => {
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
  const percentage = (score / maxScore) * 100;
  
  // Fórmula simplificada para calcular QI baseado na performance
  // QI médio = 100, desvio padrão = 15
  if (percentage >= 95) return 145; // Superdotado
  if (percentage >= 85) return 130; // Muito superior
  if (percentage >= 75) return 120; // Superior
  if (percentage >= 65) return 110; // Acima da média
  if (percentage >= 45) return 100; // Média
  if (percentage >= 35) return 90;  // Abaixo da média
  if (percentage >= 25) return 80;  // Limítrofe
  return 70; // Abaixo do limítrofe
};

export const getIQDescription = (iq: number): string => {
  if (iq >= 140) return "Superdotado - QI excepcional!";
  if (iq >= 130) return "Muito Superior - Inteligência notável!";
  if (iq >= 120) return "Superior - Acima da média!";
  if (iq >= 110) return "Inteligência Acima da Média";
  if (iq >= 90) return "Inteligência Média";
  if (iq >= 80) return "Inteligência Abaixo da Média";
  return "QI Limítrofe";
};