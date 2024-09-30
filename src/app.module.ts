import { Module } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import { PostgresConfigService } from "./config/postgres.config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ProductModule } from "./product/product.module";
import { OrderModule } from './order/order.module';


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
})
export class AppModule {}