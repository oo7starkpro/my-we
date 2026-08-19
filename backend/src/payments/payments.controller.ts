import { Body, Controller, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  
});

@Controller('payments')
export class PaymentsController {
  constructor(private prisma: PrismaService) {}

  @Post('checkout')
  async createCheckout(@Body() body: { orderId: number }) {
    console.log('Incoming checkout request', body);

    const order = await this.prisma.order.findUnique({
      where: { id: body.orderId },
      include: { items: { include: { menuItem: true } } },
    });

    if (!order) throw new Error('Order not found');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: 'http://localhost:8080/orders?success=true',
      cancel_url: 'http://localhost:8080/orders?cancelled=true',

      line_items: order.items.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: { name: item.menuItem.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      metadata: { orderId: order.id.toString() },
    });

    return { url: session.url };
  }
}
