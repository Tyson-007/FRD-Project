import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { PrismaService } from './services/prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    await app.listen(3000);
}
bootstrap();
