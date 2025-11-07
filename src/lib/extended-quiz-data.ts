import { Question } from './types';

// Dados dos testes de personalidade (20 questões)
export const personalityQuestions = [
  {
    id: 1,
    question: "Você se sente mais energizado quando:",
    options: [
      "Está com outras pessoas",
      "Está sozinho(a)",
      "Depende da situação",
      "Não tenho preferência"
    ],
    category: "extroversion"
  },
  {
    id: 2,
    question: "Ao tomar decisões importantes, você:",
    options: [
      "Confia mais na lógica e fatos",
      "Segue seus sentimentos e intuição",
      "Busca opiniões de outros",
      "Analisa prós e contras detalhadamente"
    ],
    category: "thinking"
  },
  {
    id: 3,
    question: "Você prefere:",
    options: [
      "Planos bem estruturados",
      "Flexibilidade e espontaneidade",
      "Um meio termo entre os dois",
      "Depende da situação"
    ],
    category: "judging"
  },
  {
    id: 4,
    question: "Em grupos, você geralmente:",
    options: [
      "Assume a liderança naturalmente",
      "Prefere seguir e apoiar",
      "Contribui com ideias quando necessário",
      "Observa antes de participar"
    ],
    category: "extroversion"
  },
  {
    id: 5,
    question: "Quando enfrenta problemas, você:",
    options: [
      "Busca soluções práticas imediatas",
      "Reflete profundamente sobre as causas",
      "Pede ajuda a outras pessoas",
      "Procura exemplos similares do passado"
    ],
    category: "sensing"
  },
  {
    id: 6,
    question: "Você se considera uma pessoa:",
    options: [
      "Muito organizada e pontual",
      "Flexível e adaptável",
      "Equilibrada entre organização e flexibilidade",
      "Depende do contexto"
    ],
    category: "judging"
  },
  {
    id: 7,
    question: "Em conversas, você prefere falar sobre:",
    options: [
      "Ideias abstratas e possibilidades futuras",
      "Fatos concretos e experiências reais",
      "Sentimentos e relacionamentos",
      "Planos e objetivos práticos"
    ],
    category: "intuition"
  },
  {
    id: 8,
    question: "Quando precisa relaxar, você:",
    options: [
      "Sai com amigos ou família",
      "Fica sozinho(a) em casa",
      "Faz atividades ao ar livre",
      "Lê ou assiste algo interessante"
    ],
    category: "extroversion"
  },
  {
    id: 9,
    question: "Ao criticar alguém, você:",
    options: [
      "É direto(a) e objetivo(a)",
      "Tenta ser delicado(a) e empático(a)",
      "Evita criticar quando possível",
      "Foca nos fatos, não na pessoa"
    ],
    category: "thinking"
  },
  {
    id: 10,
    question: "Você se motiva mais com:",
    options: [
      "Desafios intelectuais complexos",
      "Reconhecimento e aprovação social",
      "Autonomia e liberdade",
      "Estabilidade e segurança"
    ],
    category: "intuition"
  },
  {
    id: 11,
    question: "Em projetos, você prefere:",
    options: [
      "Planejar tudo antes de começar",
      "Começar e ajustar no caminho",
      "Seguir metodologias estabelecidas",
      "Improvisar conforme necessário"
    ],
    category: "judging"
  },
  {
    id: 12,
    question: "Você aprende melhor:",
    options: [
      "Através de experiências práticas",
      "Estudando teorias e conceitos",
      "Discutindo com outras pessoas",
      "Observando e analisando"
    ],
    category: "sensing"
  },
  {
    id: 13,
    question: "Quando está estressado(a), você:",
    options: [
      "Procura apoio de amigos/família",
      "Prefere ficar sozinho(a)",
      "Busca atividades para se distrair",
      "Analisa as causas do estresse"
    ],
    category: "extroversion"
  },
  {
    id: 14,
    question: "Você valoriza mais:",
    options: [
      "Justiça e imparcialidade",
      "Harmonia e bem-estar dos outros",
      "Eficiência e resultados",
      "Autenticidade e honestidade"
    ],
    category: "thinking"
  },
  {
    id: 15,
    question: "Ao planejar férias, você:",
    options: [
      "Organiza tudo com antecedência",
      "Deixa espaço para espontaneidade",
      "Pesquisa bastante antes de decidir",
      "Segue recomendações de outros"
    ],
    category: "judging"
  },
  {
    id: 16,
    question: "Você se interessa mais por:",
    options: [
      "Como as coisas funcionam na prática",
      "Por que as coisas são como são",
      "Como melhorar as coisas",
      "Qual o impacto nas pessoas"
    ],
    category: "sensing"
  },
  {
    id: 17,
    question: "Em reuniões, você:",
    options: [
      "Participa ativamente das discussões",
      "Prefere ouvir antes de falar",
      "Contribui quando tem algo importante",
      "Foca em tomar notas e observar"
    ],
    category: "extroversion"
  },
  {
    id: 18,
    question: "Você toma decisões baseado em:",
    options: [
      "Análise lógica dos dados",
      "Intuição e sentimentos",
      "Experiências passadas",
      "Conselhos de pessoas confiáveis"
    ],
    category: "thinking"
  },
  {
    id: 19,
    question: "Você prefere ambientes:",
    options: [
      "Estruturados e previsíveis",
      "Dinâmicos e em constante mudança",
      "Equilibrados entre estabilidade e novidade",
      "Que permitam crescimento pessoal"
    ],
    category: "judging"
  },
  {
    id: 20,
    question: "Ao resolver problemas, você:",
    options: [
      "Foca nos detalhes e fatos específicos",
      "Busca padrões e conexões maiores",
      "Considera o impacto nas pessoas",
      "Procura a solução mais eficiente"
    ],
    category: "sensing"
  }
];

// Dados dos testes de carreira (20 questões)
export const careerQuestions = [
  {
    id: 1,
    question: "Qual ambiente de trabalho mais te atrai:",
    options: [
      "Escritório corporativo estruturado",
      "Ambiente criativo e flexível",
      "Trabalho remoto/home office",
      "Ambientes externos ou variados"
    ],
    category: "environment"
  },
  {
    id: 2,
    question: "Você se sente mais realizado quando:",
    options: [
      "Ajuda outras pessoas diretamente",
      "Resolve problemas complexos",
      "Cria algo novo e original",
      "Lidera equipes e projetos"
    ],
    category: "motivation"
  },
  {
    id: 3,
    question: "Seu estilo de trabalho ideal é:",
    options: [
      "Trabalhar sozinho(a) com foco",
      "Colaborar em equipe constantemente",
      "Alternar entre trabalho solo e em grupo",
      "Liderar e orientar outras pessoas"
    ],
    category: "workstyle"
  },
  {
    id: 4,
    question: "Você prefere atividades que envolvam:",
    options: [
      "Análise de dados e números",
      "Comunicação e relacionamento",
      "Criatividade e inovação",
      "Organização e planejamento"
    ],
    category: "skills"
  },
  {
    id: 5,
    question: "Qual tipo de desafio mais te motiva:",
    options: [
      "Problemas técnicos complexos",
      "Situações que exigem criatividade",
      "Desafios de liderança e gestão",
      "Oportunidades de ajudar outros"
    ],
    category: "motivation"
  },
  {
    id: 6,
    question: "Você se vê trabalhando principalmente com:",
    options: [
      "Tecnologia e sistemas",
      "Pessoas e relacionamentos",
      "Arte e expressão criativa",
      "Negócios e estratégia"
    ],
    category: "focus"
  },
  {
    id: 7,
    question: "Seu ritmo de trabalho preferido é:",
    options: [
      "Constante e organizado",
      "Intenso com prazos apertados",
      "Flexível conforme inspiração",
      "Equilibrado com pausas regulares"
    ],
    category: "workstyle"
  },
  {
    id: 8,
    question: "Você prefere trabalhar em projetos:",
    options: [
      "De longo prazo com planejamento detalhado",
      "De curto prazo com resultados rápidos",
      "Variados e sempre diferentes",
      "Que tenham impacto social positivo"
    ],
    category: "projects"
  },
  {
    id: 9,
    question: "Qual aspecto é mais importante no trabalho:",
    options: [
      "Estabilidade financeira",
      "Realização pessoal",
      "Reconhecimento profissional",
      "Equilíbrio vida-trabalho"
    ],
    category: "values"
  },
  {
    id: 10,
    question: "Você se sente confortável:",
    options: [
      "Seguindo processos estabelecidos",
      "Criando novos métodos e soluções",
      "Adaptando-se a mudanças constantes",
      "Mantendo rotinas previsíveis"
    ],
    category: "adaptability"
  },
  {
    id: 11,
    question: "Sua maior força profissional é:",
    options: [
      "Capacidade analítica e lógica",
      "Habilidades de comunicação",
      "Criatividade e inovação",
      "Organização e eficiência"
    ],
    category: "strengths"
  },
  {
    id: 12,
    question: "Você prefere receber feedback:",
    options: [
      "Direto e baseado em métricas",
      "Construtivo e encorajador",
      "Focado em melhorias criativas",
      "Estruturado e documentado"
    ],
    category: "communication"
  },
  {
    id: 13,
    question: "Em situações de pressão, você:",
    options: [
      "Mantém o foco e analisa logicamente",
      "Busca apoio da equipe",
      "Encontra soluções criativas",
      "Organiza prioridades sistematicamente"
    ],
    category: "pressure"
  },
  {
    id: 14,
    question: "Você se motiva mais com:",
    options: [
      "Desafios intelectuais",
      "Impacto positivo nas pessoas",
      "Liberdade criativa",
      "Crescimento na carreira"
    ],
    category: "motivation"
  },
  {
    id: 15,
    question: "Seu ambiente de aprendizado ideal é:",
    options: [
      "Cursos técnicos e especializações",
      "Workshops e networking",
      "Experiências práticas e experimentação",
      "Programas estruturados de desenvolvimento"
    ],
    category: "learning"
  },
  {
    id: 16,
    question: "Você prefere trabalhar com:",
    options: [
      "Dados, números e análises",
      "Pessoas, equipes e comunidades",
      "Ideias, conceitos e possibilidades",
      "Processos, sistemas e estruturas"
    ],
    category: "focus"
  },
  {
    id: 17,
    question: "Qual tipo de reconhecimento mais valoriza:",
    options: [
      "Promoções e aumentos salariais",
      "Feedback positivo de colegas/clientes",
      "Prêmios por inovação e criatividade",
      "Certificações e títulos profissionais"
    ],
    category: "recognition"
  },
  {
    id: 18,
    question: "Você se vê no futuro:",
    options: [
      "Como especialista técnico em sua área",
      "Liderando equipes e projetos",
      "Empreendendo ou criando algo próprio",
      "Fazendo diferença social positiva"
    ],
    category: "future"
  },
  {
    id: 19,
    question: "Sua abordagem para resolver problemas é:",
    options: [
      "Sistemática e baseada em dados",
      "Colaborativa e consultiva",
      "Intuitiva e experimental",
      "Estruturada e metodológica"
    ],
    category: "problem_solving"
  },
  {
    id: 20,
    question: "O que mais te frustra no trabalho:",
    options: [
      "Falta de recursos ou ferramentas adequadas",
      "Conflitos interpessoais ou má comunicação",
      "Limitações à criatividade e inovação",
      "Desorganização e falta de processos"
    ],
    category: "frustrations"
  }
];

// Dados dos subtestes de QI - Básico (15 questões)
export const basicIQQuestions: Question[] = [
  {
    id: 1,
    type: 'math',
    question: 'Quanto é 15 + 27?',
    options: ['40', '41', '42', '43'],
    correctAnswer: 2,
    points: 4,
    difficulty: 'easy'
  },
  {
    id: 2,
    type: 'logic',
    question: 'Complete a sequência: 5, 10, 15, 20, ?',
    options: ['23', '25', '27', '30'],
    correctAnswer: 1,
    points: 4,
    difficulty: 'easy'
  },
  {
    id: 3,
    type: 'verbal',
    question: 'Qual palavra é diferente das outras?',
    options: ['Azul', 'Verde', 'Amarelo', 'Quadrado'],
    correctAnswer: 3,
    points: 4,
    difficulty: 'easy'
  },
  {
    id: 4,
    type: 'math',
    question: 'Se você tem 20 maçãs e come 5, quantas restam?',
    options: ['15', '16', '14', '13'],
    correctAnswer: 0,
    points: 4,
    difficulty: 'easy'
  },
  {
    id: 5,
    type: 'logic',
    question: 'Complete: A, B, C, D, ?',
    options: ['F', 'E', 'G', 'H'],
    correctAnswer: 1,
    points: 4,
    difficulty: 'easy'
  },
  {
    id: 6,
    type: 'visual',
    question: 'Quantos lados tem um hexágono?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 7,
    type: 'math',
    question: 'Quanto é 8 × 7?',
    options: ['54', '56', '58', '60'],
    correctAnswer: 1,
    points: 5,
    difficulty: 'medium'
  },
  {
    id: 8,
    type: 'verbal',
    question: 'CARRO está para ESTRADA assim como BARCO está para:',
    options: ['Água', 'Porto', 'Vela', 'Peixe'],
    correctAnswer: 0,
    points: 5,
    difficulty: 'medium'
  },
  {
    id: 9,
    type: 'logic',
    question: 'Se todos os gatos são animais e alguns animais voam, então:',
    options: ['Todos os gatos voam', 'Alguns gatos voam', 'Nenhum gato voa', 'Não podemos concluir'],
    correctAnswer: 3,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 10,
    type: 'math',
    question: 'Qual é 25% de 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 11,
    type: 'visual',
    question: 'Complete a sequência: ○ ○ ● ○ ○ ● ?',
    options: ['○', '●', '◐', '◑'],
    correctAnswer: 0,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 12,
    type: 'verbal',
    question: 'Qual é o antônimo de EXPANDIR?',
    options: ['Crescer', 'Contrair', 'Aumentar', 'Ampliar'],
    correctAnswer: 1,
    points: 6,
    difficulty: 'medium'
  },
  {
    id: 13,
    type: 'logic',
    question: 'Complete: 2, 4, 8, 16, ?',
    options: ['24', '28', '32', '36'],
    correctAnswer: 2,
    points: 7,
    difficulty: 'hard'
  },
  {
    id: 14,
    type: 'math',
    question: 'Se x + 5 = 12, qual é o valor de x?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    points: 7,
    difficulty: 'hard'
  },
  {
    id: 15,
    type: 'verbal',
    question: 'MÉDICO está para HOSPITAL assim como PROFESSOR está para:',
    options: ['Aluno', 'Escola', 'Livro', 'Ensino'],
    correctAnswer: 1,
    points: 7,
    difficulty: 'hard'
  }
];

// Dados dos subtestes de QI - Avançado (20 questões)
export const advancedIQQuestions: Question[] = [
  {
    id: 1,
    type: 'math',
    question: 'Se f(x) = 2x² + 3x - 1, qual é f(2)?',
    options: ['11', '13', '15', '17'],
    correctAnswer: 1,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 2,
    type: 'logic',
    question: 'Em uma progressão geométrica, se a₁ = 2 e r = 3, qual é a₄?',
    options: ['18', '24', '54', '162'],
    correctAnswer: 2,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 3,
    type: 'verbal',
    question: 'Qual palavra melhor completa: EFÊMERO está para DURADOURO assim como OPACO está para:',
    options: ['Escuro', 'Transparente', 'Brilhante', 'Claro'],
    correctAnswer: 1,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 4,
    type: 'math',
    question: 'Resolva: ∫(2x + 3)dx',
    options: ['x² + 3x + C', '2x² + 3x + C', 'x² + 3x', '2x + 3'],
    correctAnswer: 0,
    points: 10,
    difficulty: 'hard'
  },
  {
    id: 5,
    type: 'logic',
    question: 'Se P → Q é verdadeiro e Q é falso, então P é:',
    options: ['Verdadeiro', 'Falso', 'Indeterminado', 'Depende do contexto'],
    correctAnswer: 1,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 6,
    type: 'visual',
    question: 'Quantos cubos pequenos há em um cubo 4×4×4?',
    options: ['48', '56', '64', '72'],
    correctAnswer: 2,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 7,
    type: 'math',
    question: 'Se log₃(x) = 4, qual é o valor de x?',
    options: ['12', '64', '81', '256'],
    correctAnswer: 2,
    points: 10,
    difficulty: 'hard'
  },
  {
    id: 8,
    type: 'verbal',
    question: 'PARADIGMA está para MODELO assim como AXIOMA está para:',
    options: ['Teorema', 'Princípio', 'Hipótese', 'Conclusão'],
    correctAnswer: 1,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 9,
    type: 'logic',
    question: 'Complete a sequência: 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '19', '21', '24'],
    correctAnswer: 2,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 10,
    type: 'math',
    question: 'Qual é a derivada de e^(2x)?',
    options: ['e^(2x)', '2e^(2x)', 'e^(2x)/2', '2xe^(2x)'],
    correctAnswer: 1,
    points: 10,
    difficulty: 'hard'
  },
  {
    id: 11,
    type: 'visual',
    question: 'Em um dodecaedro regular, quantas faces se encontram em cada vértice?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 12,
    type: 'verbal',
    question: 'Qual é o significado de UBÍQUO?',
    options: ['Raro', 'Antigo', 'Presente em toda parte', 'Desconhecido'],
    correctAnswer: 2,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 13,
    type: 'logic',
    question: 'Se A ∩ B = ∅ e A ∪ B = U, então A e B são:',
    options: ['Iguais', 'Complementares', 'Subconjuntos', 'Intersectantes'],
    correctAnswer: 1,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 14,
    type: 'math',
    question: 'Resolva: lim(x→0) (sin x)/x',
    options: ['0', '1', '∞', 'Não existe'],
    correctAnswer: 1,
    points: 10,
    difficulty: 'hard'
  },
  {
    id: 15,
    type: 'verbal',
    question: 'PROLIXO está para CONCISO assim como REDUNDANTE está para:',
    options: ['Repetitivo', 'Essencial', 'Desnecessário', 'Abundante'],
    correctAnswer: 1,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 16,
    type: 'logic',
    question: 'Em lógica proposicional, ¬(P ∧ Q) é equivalente a:',
    options: ['¬P ∧ ¬Q', '¬P ∨ ¬Q', 'P ∨ Q', 'P → Q'],
    correctAnswer: 1,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 17,
    type: 'math',
    question: 'Qual é o determinante da matriz [[2,3],[1,4]]?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 0,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 18,
    type: 'visual',
    question: 'Quantas diagonais tem um octógono?',
    options: ['16', '18', '20', '24'],
    correctAnswer: 2,
    points: 8,
    difficulty: 'hard'
  },
  {
    id: 19,
    type: 'verbal',
    question: 'HETEROGÊNEO está para HOMOGÊNEO assim como DÍSPARE está para:',
    options: ['Diferente', 'Igual', 'Variado', 'Uniforme'],
    correctAnswer: 3,
    points: 9,
    difficulty: 'hard'
  },
  {
    id: 20,
    type: 'logic',
    question: 'Se todos os X são Y, e nenhum Y é Z, então:',
    options: ['Alguns X são Z', 'Nenhum X é Z', 'Todos X são Z', 'Não se pode concluir'],
    correctAnswer: 1,
    points: 10,
    difficulty: 'hard'
  }
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    text: "Descobri aspectos da minha personalidade que nem imaginava! Resultado muito preciso.",
    rating: 5,
    testType: "personality"
  },
  {
    id: 2,
    name: "Carlos Santos",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "O teste de QI me ajudou a entender melhor minhas habilidades. Recomendo!",
    rating: 5,
    testType: "iq"
  },
  {
    id: 3,
    name: "Marina Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "Mudei de carreira depois do teste! Encontrei minha verdadeira vocação.",
    rating: 5,
    testType: "career"
  }
];

// Pricing
export const testPricing = {
  iq_basic: { price: "R$ 9,90", title: "Teste de QI Básico" },
  iq_advanced: { price: "R$ 19,90", title: "Teste de QI Avançado" },
  personality: { price: "R$ 14,90", title: "Teste de Personalidade" },
  career: { price: "R$ 16,90", title: "Teste de Carreira" },
  bundle: { price: "R$ 39,90", title: "Pacote Completo", discount: "50% OFF" }
};