import { Module } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import { PostgresConfigService } from "./config/postgres.config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
   UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule {}