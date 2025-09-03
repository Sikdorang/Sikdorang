import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.kakao',
    }),
    AuthModule,
    StoreModule,
    CategoryModule,
    MenuModule,
    OrderModule,
    RecommendationModule,
  ],
})
export class AppModule {}
