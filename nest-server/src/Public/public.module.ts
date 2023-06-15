import { Module } from "@nestjs/common";
import { PublicController } from "./public.controller";
import { PublicService } from "./public.service";
import { PrismaService } from "../prisma.service";
@Module({
    imports: [],
    controllers: [PublicController],
    providers: [PublicService, PrismaService],
})
export class PublicModule {}
