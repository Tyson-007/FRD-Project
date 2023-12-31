"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerController = void 0;
const common_1 = require("@nestjs/common");
const consumer_service_1 = require("./consumer.service");
const public_service_1 = require("../Public/public.service");
let ConsumerController = exports.ConsumerController = class ConsumerController {
    constructor(consumerService, publicService) {
        this.consumerService = consumerService;
        this.publicService = publicService;
    }
    async getSelfInfo(userId) {
        return await this.consumerService.getSelfInfo(userId);
    }
    getConsumerInfo(userId) {
        console.log(userId);
        return this.consumerService.getConsumerInfo(userId);
    }
    async displayWishList(userId) {
        return this.consumerService.displayWishList(userId);
    }
    async uploadWishList(form) {
        const { consumerId, productId } = form;
        console.log("yoman: ", form);
        try {
            const uploadWishList = await this.consumerService.uploadWishList(form);
            return { success: true, data: uploadWishList };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async deleteWishList(id) {
        console.log("del me:", id);
        try {
            const deleteWishList = await this.consumerService.deleteWishList(id);
            return { success: true, data: deleteWishList };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async getShopInfo(shopId) {
        return await this.consumerService.getShopInfo(shopId);
    }
    displayOrder(JWTpayload) {
        console.log();
        return this.consumerService.displayOrder(JWTpayload);
    }
    deleteOrder(id) {
        console.log(id);
        return this.consumerService.deleteOrder(Number(id));
    }
    displayOrderHistory(userId) {
        console.log(userId);
        return this.consumerService.getOrderRecord(userId);
    }
    createOrder(form) {
        console.log(form);
        return this.consumerService.createOrder(form);
    }
    paymentConfirm(paymentArr) {
        console.log();
        return this.consumerService.paymentConfirm(paymentArr.idArr);
    }
    async editUserProfile(userId, form) {
        return await this.consumerService.editUserProfile(userId, form);
    }
    async editConProfile(conId, form) {
        return await this.consumerService.editConProfile(conId, form);
    }
    async editPassword(userId, form) {
        return await this.consumerService.editPassword(userId, form);
    }
    getHot() {
        return this.consumerService.getHot();
    }
    getAllProduct() {
        return this.consumerService.getAllProduct();
    }
};
__decorate([
    (0, common_1.Get)("userInfo/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "getSelfInfo", null);
__decorate([
    (0, common_1.Get)("consumerInfo/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "getConsumerInfo", null);
__decorate([
    (0, common_1.Get)("wishlist/get/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "displayWishList", null);
__decorate([
    (0, common_1.Post)("wishlist/upload"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "uploadWishList", null);
__decorate([
    (0, common_1.Delete)("wishlist/del/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "deleteWishList", null);
__decorate([
    (0, common_1.Get)("shopInfo/:shopId"),
    __param(0, (0, common_1.Param)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "getShopInfo", null);
__decorate([
    (0, common_1.Get)("order/:JWT"),
    __param(0, (0, common_1.Param)("JWT")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "displayOrder", null);
__decorate([
    (0, common_1.Get)("order/delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Get)("order/history/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "displayOrderHistory", null);
__decorate([
    (0, common_1.Post)("order/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)("order/payment"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "paymentConfirm", null);
__decorate([
    (0, common_1.Put)("userProfile/edit/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "editUserProfile", null);
__decorate([
    (0, common_1.Put)("conProfile/edit/:conId"),
    __param(0, (0, common_1.Param)("conId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "editConProfile", null);
__decorate([
    (0, common_1.Put)("password/edit/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "editPassword", null);
__decorate([
    (0, common_1.Get)("product/hot"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "getHot", null);
__decorate([
    (0, common_1.Get)("product/allProduct"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "getAllProduct", null);
exports.ConsumerController = ConsumerController = __decorate([
    (0, common_1.Controller)("consumer"),
    __metadata("design:paramtypes", [consumer_service_1.ConsumerService,
        public_service_1.PublicService])
], ConsumerController);
//# sourceMappingURL=consumer.controller.js.map