import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, $Enums } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: number,
    items: { menuItemId: number; quantity: number }[],
  ) {
    const total = await this.calculateTotal(items);

    return this.prisma.order.create({
      data: {
        userId,
        total,
        status: $Enums.OrderStatus.PENDING,

        items: {
          create: await Promise.all(
            items.map(async (item) => {
              const menuItem = await this.prisma.menuItem.findUnique({
                where: { id: item.menuItemId },
                select: { price: true },
              });

              if (!menuItem) {
                throw new Error(`Menu item ${item.menuItemId} not found`);
              }

              return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price,
              };
            }),
          ),
        },
      },
      include: {
        items: { include: { menuItem: true } },
      },
    });
  }

  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { menuItem: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async calculateTotal(
    items: { menuItemId: number; quantity: number }[],
  ) {
    const prices = await this.prisma.menuItem.findMany({
      where: { id: { in: items.map((i) => i.menuItemId) } },
      select: { id: true, price: true },
    });

    return items.reduce((sum, item) => {
      const match = prices.find((p) => p.id === item.menuItemId);
      return sum + (match?.price || 0) * item.quantity;
    }, 0);
  }

  // CANCEL ORDER
  async cancelOrder(userId: number, orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new Error('Order not found');

    if (order.userId !== userId)
      throw new Error('You cannot cancel this order');

    if (order.status === $Enums.OrderStatus.COMPLETED)
  throw new Error('Order already completed and cannot be cancelled');


    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: $Enums.OrderStatus.CANCELLED },
    });
  }

  // KITCHEN / ADMIN UPDATE
  async updateStatus(id: number, status: $Enums.OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
