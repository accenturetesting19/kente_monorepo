import { Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
@Controller("authentication")
@ApiTags('Kente client microservices')
export class authenticationController {
  constructor(@Inject("AUTHENTICATION") private client: ClientProxy) {}
  @Post(":mtnId")
  auth(@Param("mtnId") mtnId: string) {
    return this.client.send(
      { cmd: "MTN_ID_VERIFICATION", role: ["admin", "user", "manager"] },
      mtnId
    );
  }
  @Get("validate/:accessToken")
  valid(@Param("accessToken") accessToken: string) {
    return this.client.send(
      { cmd: "MTN_ID_ACCESS_TOKEN_VERIFCATION" },
      accessToken
    );
  }
}
