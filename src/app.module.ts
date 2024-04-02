import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsersModule,
    ProjectsModule,
    AuthModule,
    ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
