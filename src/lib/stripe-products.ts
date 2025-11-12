// Produtos e preços do Stripe
export const STRIPE_PRODUCTS = {
  iq_basic: {
    id: 'prod_TPGUyC04siDR1R',
    name: 'Teste de QI Básico',
    description: 'Avaliação simples de raciocínio lógico e agilidade mental.',
    price: 990, // R$ 9,90 em centavos
    priceFormatted: 'R$ 9,90'
  },
  iq_advanced: {
    id: 'prod_TPGVjdwP4OiD1X',
    name: 'Teste de QI Avançado',
    description: 'Versão completa do teste de QI, com questões mais complexas e análise detalhada.',
    price: 1490, // R$ 14,90 em centavos
    priceFormatted: 'R$ 14,90'
  },
  personality: {
    id: 'prod_TPGVjdwP4OiD1X',
    name: 'Teste de Personalidade',
    description: 'Avaliação de perfil comportamental e traços de personalidade.',
    price: 1490, // R$ 14,90 em centavos
    priceFormatted: 'R$ 14,90'
  },
  career: {
    id: 'prod_TPGVbVYr5mU06E',
    name: 'Teste de Carreira',
    description: 'Módulo voltado para autoconhecimento profissional e direcionamento de carreira.',
    price: 1990, // R$ 19,90 em centavos
    priceFormatted: 'R$ 19,90'
  }
} as const;

export type TestType = keyof typeof STRIPE_PRODUCTS;

export function getProductByTestType(testType: TestType) {
  return STRIPE_PRODUCTS[testType];
}
