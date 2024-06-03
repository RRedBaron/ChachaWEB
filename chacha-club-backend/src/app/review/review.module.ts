import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { SecurityModule } from '../security/security.module';

@Module({
    imports: [SecurityModule],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewRepository],
    exports: [ReviewService]
})
export class ReviewModule {}
