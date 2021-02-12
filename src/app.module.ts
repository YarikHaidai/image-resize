import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getOrmConfig() as any),
    UserModule,
    AuthModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
