import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants/auth.jwt.constants';
import { APP_GUARD } from '@nestjs/core';
import { microservicesController } from './controller/auth.controller';
import { authService } from './services/auth.service';
import { AuthRepo } from './repository/auth.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DbConnector } from './db/db.connect';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['stagging.env','development.env', 'production.env', '.env'],
      isGlobal: true,
      cache: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env["JWT_ACCESS_SECRET"],
      signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [microservicesController],
  providers: [
    authService,...DbConnector, ...AuthRepo,
  ],
  exports: [],
})
export class AuthLibraryModule {}
