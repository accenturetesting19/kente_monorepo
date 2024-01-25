/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { AuthLibraryModule } from "@kente-mono/auth-library";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
  //micro services application module 
  const app = await NestFactory.create(AuthLibraryModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: 4000,
    },
  });
  //create client app
  const client = await NestFactory.create(AppModule);
  //swagger setup details
  const config = new DocumentBuilder()
    .setTitle("Client authentication microservices - Kente")
    .setDescription("Microservices api")
    .setVersion("0.1")
    .addTag("Kente platform")
    .build();
  const document = SwaggerModule.createDocument(client, config);
  SwaggerModule.setup("api", client, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await client.listen(3000);
  Logger.log("Auth microservice running");
}
bootstrap();
