import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from 'src/entities';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  async getAllProduct(query?: string): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(productId: number): Promise<Product> {
    return this.productRepository.findOne({ id: productId });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.persistAndFlush(product);
    return product;
  }
}
