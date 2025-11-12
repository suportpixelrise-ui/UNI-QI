import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura do webhook ausente' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar assinatura do webhook (apenas se STRIPE_WEBHOOK_SECRET estiver configurado)
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // Em desenvolvimento, aceitar sem verificação (NÃO USAR EM PRODUÇÃO)
      event = JSON.parse(body);
    }
  } catch (error: any) {
    console.error('Erro ao verificar webhook:', error);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // Processar evento de pagamento bem-sucedido
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const testType = session.metadata?.testType;
    const userId = session.metadata?.userId;
    const productId = session.metadata?.productId;

    if (!testType || !userId) {
      console.error('Metadados ausentes no webhook:', session.metadata);
      return NextResponse.json(
        { error: 'Metadados ausentes' },
        { status: 400 }
      );
    }

    try {
      // Registrar pagamento no Supabase
      const { data, error } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          test_type: testType,
          product_id: productId,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent,
          amount: session.amount_total,
          currency: session.currency,
          status: 'completed',
          customer_email: session.customer_email,
          paid_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao salvar pagamento no Supabase:', error);
        // Não retornar erro para o Stripe - já recebemos o pagamento
      }

      console.log('Pagamento registrado com sucesso:', {
        userId,
        testType,
        sessionId: session.id
      });
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
    }
  }

  return NextResponse.json({ received: true });
}
