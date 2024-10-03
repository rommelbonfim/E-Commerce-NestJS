import { Module } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import { PostgresConfigService } from "./config/postgres.config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ProductModule } from "./product/product.module";
import { OrderModule } from './order/order.module';
import { APP_FILTER } from "@nestjs/core";
import { GlobalExceptionFilter } from "./filters/global-exception-filter";


@Module({
  imports: [
   UserModule,ProductModule, OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    OrderModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}