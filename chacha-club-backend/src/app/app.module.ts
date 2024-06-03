import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { SecurityModule } from './security/security.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { DishModule } from './dish/dish.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ReviewModule } from './review/review.module';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        UserModule,
        SecurityModule,
        AuthModule,
        CategoryModule,
        DishModule,
        IngredientModule,
        ReviewModule,
        MailModule
    ],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter
        }
    ]
})
export class AppModule {}
