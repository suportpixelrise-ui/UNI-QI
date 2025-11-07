import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export interface PaymentData {
  testType: string
  amount: number
  testResultId: string
}

export const createPaymentIntent = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar intenção de pagamento')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro no pagamento:', error)
    throw error
  }
}

export const processPayment = async (paymentData: PaymentData) => {
  const stripe = await stripePromise
  
  if (!stripe) {
    throw new Error('Stripe não carregado')
  }

  const { clientSecret } = await createPaymentIntent(paymentData)

  const result = await stripe.confirmPayment({
    clientSecret,
    confirmParams: {
      return_url: `${window.location.origin}/payment-success`,
    },
  })

  if (result.error) {
    throw new Error(result.error.message)
  }

  return result
}

export { stripePromise }