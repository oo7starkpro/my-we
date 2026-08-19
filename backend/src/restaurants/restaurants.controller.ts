import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private service: RestaurantsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() body: { name: string; address: string }) {
    return this.service.create(body);
  }

  @Post(':id/menu')
  addMenu(
    @Param('id') id: string,
    @Body()
    body: { name: string; price: number; description?: string },
  ) {
    return this.service.addMenuItem(Number(id), body);
  }
}
