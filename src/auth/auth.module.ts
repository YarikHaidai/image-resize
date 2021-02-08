import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from "./local.strategy";
import { AuthController } from './auth.controller';
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";

// TODO imports: UserModule
// @Module({
//   imports: [PassportModule, UserModule],
//   providers: [AuthService, LocalStrategy],
//   controllers: [AuthController],
// })

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
