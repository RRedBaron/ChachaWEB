import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { DishRepository } from './dish.repository';
import { IngredientModule } from '../ingredient/ingredient.module';
import { ReviewModule } from '../review/review.module';
import { SecurityModule } from '../security/security.module';

@Module({
    imports: [IngredientModule, ReviewModule, SecurityModule],
    providers: [DishService, DishRepository],
    controllers: [DishController]
})
export class DishModule {}
