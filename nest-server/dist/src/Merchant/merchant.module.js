"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantModule = void 0;
const common_1 = require("@nestjs/common");
const merchant_controller_1 = require("./merchant.controller");
const merchant_service_1 = require("./merchant.service");
const public_service_1 = require("../Public/public.service");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let MerchantModule = exports.MerchantModule = class MerchantModule {
};
exports.MerchantModule = MerchantModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [merchant_controller_1.MerchantController],
        providers: [merchant_service_1.MerchantService, public_service_1.PublicService, prisma_service_1.PrismaService, jwt_1.JwtService, config_1.ConfigService],
    })
], MerchantModule);
//# sourceMappingURL=merchant.module.js.map