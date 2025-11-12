import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // evita erros no build
export const revalidate = 0;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Trata eventos específicos
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      console.log("✅ Pagamento confirmado:", session.id);

      // Exemplo: Atualiza no Supabase que o teste foi pago
      // await supabase.from("test_results").update({ is_paid: true }).eq("id", session.metadata.test_id);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Erro no webhook:", err.message);
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }
}
