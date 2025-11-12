import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductByTestType } from '@/lib/stripe-products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
});

export async function POST(request: NextRequest) {
  try {
    const { testType, userId, userEmail } = await request.json();

    if (!testType) {
      return NextResponse.json(
        { error: 'Tipo de teste não fornecido' },
        { status: 400 }
      );
    }

    const product = getProductByTestType(testType);

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&test_type=${testType}`,
      cancel_url: `${request.nextUrl.origin}/?canceled=true`,
      metadata: {
        testType,
        userId: userId || 'anonymous',
        productId: product.id,
      },
      customer_email: userEmail,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
