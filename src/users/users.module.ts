import { Global, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersProjectsEntity } from './entities/usersProjects.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';

@Global()
@Module({

  imports:[
    TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity]),
    ProvidersModule,
  ],
  providers: [UsersService, HttpCustomService],

  controllers: [UsersController],

  exports:[UsersService, TypeOrmModule]
})
export class UsersModule {}
