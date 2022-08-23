import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(@Query() query: string) {
    return this.productService.getAllProduct(query);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
