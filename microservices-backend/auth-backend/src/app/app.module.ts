import { Module } from "@nestjs/common";
import { AuthLibraryModule } from "@kente-mono/auth-library";
import { authenticationController } from "./client-auth/controller/microservices.controller";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
@Module({
  imports: [],
  controllers: [authenticationController],
  providers: [
    {
      provide: "AUTHENTICATION",
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: "localhost",
            port: 4000,
          },
        });
      },
    },
  ],
})
export class AppModule {}
