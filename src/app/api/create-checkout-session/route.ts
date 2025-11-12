import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { productId, testId, amount } = await req.json();

    // Mapear testId para URL de sucesso
    const successUrls: { [key: string]: string } = {
      'iq-basico': '/resultado/qi-basico',
      'iq-avancado': '/resultado/qi-avancado',
      'personalidade': '/resultado/personalidade',
      'carreira': '/resultado/carreira',
    };

    const successUrl = successUrls[testId] || '/';

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Teste UNI-AQI - ${testId}`,
              description: 'Acesso completo ao resultado do teste',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pagamento`,
      metadata: {
        testId,
        productId,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
