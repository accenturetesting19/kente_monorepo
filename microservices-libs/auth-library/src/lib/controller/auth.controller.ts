import { Controller, HttpCode, HttpStatus, UseGuards, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { authService } from '../services/auth.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Controller('microservices-auth')
export class microservicesController {
  constructor(private auth: authService) {}
  //emit the messages => verify user my MTN ID
  //params to receive a command and a role
  @MessagePattern({ cmd: 'MTN_ID_VERIFICATION', role: ['admin','user','manager'] })
  async verifyID(id: string) {
    return await this.auth.FindID(id);
  }
  @MessagePattern({ cmd: 'MTN_ID_ACCESS_TOKEN_VERIFCATION' })
  jwtVerification(id: string) {
    return this.auth.validateToken(id);
  }
}
