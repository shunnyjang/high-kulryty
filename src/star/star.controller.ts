import { Body, Controller, Post } from '@nestjs/common';
import { CreateStarDto } from './dto/create-star.dto';
import { StarService } from './star.service';

@Controller('star')
export class StarController {
  constructor(private readonly starService: StarService) {}

  @Post()
  async registerNewStar(@Body() createStarDto: CreateStarDto) {
    return this.starService.registerNewStar(createStarDto);
  }
}
