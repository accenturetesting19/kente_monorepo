/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { authEntity } from "../entity/entity.container/auth.entity";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class authService {
  constructor(
    @Inject("AUTH_REPO") private auth: typeof authEntity,
    private jwtService: JwtService
  ) {}
  async FindID(MTN_ID: string): Promise<authEntity | any> {
    const user = await this.auth.findOne({ where: { MTN_ID } });
    if (!user) {
      return {
        status: {
          code: HttpStatus.FORBIDDEN,
          error: ["INVALID ACCESS TOKEN PROVIDED"],
          MTN_ID: MTN_ID,
        },
      };
    }
    return { access_token: await this.jwtService.signAsync({ sub: user }) };
  }
  async validateToken(MTN_ID: string): Promise<any> {
    try {
      const decode = await this.jwtService.verify(MTN_ID);
      if (decode) return { valid: true };
    } catch(error) {
      Logger.error(error)
      Logger.log(error)
      return {
        status: {
          code: HttpStatus.CONFLICT,
          error: error,
        },
      };
    }
  }
}
