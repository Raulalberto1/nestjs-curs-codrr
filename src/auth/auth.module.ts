import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports:[UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  //exports: [UsersModule, TypeOrmModule]
})
export class AuthModule {}
