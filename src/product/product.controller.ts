import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Product } from 'src/entities';
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

  @Get('/:productId')
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<Product> {
    return this.productService.getProductById(productId);
  }
}
