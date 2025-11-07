export interface Question {
  id: number;
  type: 'math' | 'logic' | 'visual' | 'verbal';
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  score: number;
  showMotivation: boolean;
  isCompleted: boolean;
  isPaid: boolean;
}

export interface MotivationalMessage {
  id: number;
  message: string;
  trigger: number; // question number to trigger
}