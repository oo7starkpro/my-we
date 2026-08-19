import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.restaurant.findMany({
      include: { menu: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: { menu: true },
    });
  }

  async create(data: any) {
    return this.prisma.restaurant.create({
      data,
    });
  }

  async addMenuItem(restaurantId: number, data: any) {
    return this.prisma.menuItem.create({
      data: {
        ...data,
        restaurantId,
      },
    });
  }
}
