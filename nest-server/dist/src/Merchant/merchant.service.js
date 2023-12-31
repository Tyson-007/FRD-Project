"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let MerchantService = exports.MerchantService = class MerchantService {
    async getSelfInfo(userId) {
        const foundUser = await prisma.$queryRawUnsafe(`select merchant.id, merchant_name, merchant_phone, address, bank_account, opening_hour, district, area from users JOIN merchant on users.id = users_id JOIN district on district.id = district_id JOIN area on area.id = area_id where users.id = ${userId};`);
        return foundUser;
    }
    async editMerProfile(merchantId, form) {
        const merchant = {
            merchant_image: form.merchant_image,
            merchant_name: form.merchant_name,
            merchant_phone: form.merchant_phone,
            biz_registration: form.biz_registration,
            address: form.address,
            opening_hour: form.opening_hour,
            announcement: form.announcement,
            district: form.district,
            bank_account: form.bank_account,
        };
        const editMerProfile = await prisma.merchant.update({
            where: { id: Number(merchantId) },
            data: merchant,
        });
        return editMerProfile;
    }
    async getAllItem(merId) {
        const foundItem = await prisma.$queryRawUnsafe(`select item.id, stock_status, price, version, version_image, platform, product_name, end_date from item JOIN version on version.id = version_id JOIN product on product.id = product_id JOIN platform on platform.id = platform_id JOIN merchant on merchant.id = merchant_id where merchant.id = ${merId} AND availability = true ORDER BY item.id;`);
        return foundItem;
    }
    async getComment(merId) {
        const foundComment = await prisma.$queryRawUnsafe(`select consumer_name, rating, comment, create_time from feedback JOIN consumer on consumer.id = conumber_id where merchant_id = ${merId} ORDER BY create_time DESC;`);
        return foundComment;
    }
    async uploadItems(form) {
        try {
            const uploadItem = await prisma.item.create({
                data: {
                    merchant: { connect: { id: form.merchant_id } },
                    version: { connect: { id: form.version_id } },
                    end_date: form.end_date,
                    price: parseInt(form.price),
                    availability: form.availability,
                    stock_status: form.stock_status,
                },
            });
            console.log(uploadItem);
            return uploadItem;
        }
        catch (error) {
            console.error("Error creating item:", error);
            throw new Error("Failed to create item");
        }
    }
    async updateItems(itemId, form) {
        let itemInfo = {
            price: form.price,
            stock_status: form.stock_status,
            end_date: form.end_date,
        };
        const userUpdate = await prisma.item.update({
            where: { id: Number(itemId) },
            data: itemInfo,
        });
        return true;
    }
    async deleteItems(itemId) {
        let itemInfo = {
            availability: false,
        };
        const userUpdate = await prisma.item.update({
            where: { id: Number(itemId) },
            data: itemInfo,
        });
        return true;
    }
    async getPreOrderItem(merId) {
        const foundRecord = await prisma.$queryRawUnsafe(`select item_id, product_name || ' ' || version AS full_name, release_date, COUNT(item_id)::integer AS NumberOfOrders from orders JOIN item ON item.id = item_id JOIN version ON version.id = version_id JOIN product ON product.id = product_id WHERE merchant_id = ${merId} AND order_status = false GROUP BY orders.item_id, product_name, version, release_date, item.id ORDER BY item.id DESC;`);
        return foundRecord;
    }
    async getPreOrderRecord(itemId) {
        const foundRecord = await prisma.$queryRawUnsafe(`select amount, create_time, consumer_name, product_name || ' ' || version AS full_name from orders JOIN item ON item.id = item_id JOIN version ON version.id = version_id JOIN product ON product.id = product_id JOIN consumer ON consumer.id = consumer_id WHERE item_id = ${itemId} AND order_status = false ORDER BY create_time ;`);
        return foundRecord;
    }
    async getOrderRecord(merId) {
        const foundRecord = await prisma.$queryRawUnsafe(`select consumer.id, consumer_name, create_time, COUNT(orders.id)::integer AS NumberOfOrders, SUM(orders.amount)::integer AS AmountOfOrders from orders JOIN consumer ON consumer.id = consumer_id JOIN item on item.id = item_id WHERE merchant_id = ${merId} AND order_status = true GROUP BY orders.create_time, consumer.id ORDER BY create_time DESC;`);
        return foundRecord;
    }
    async getTradeInfo(form) {
        const foundRecord = await prisma.$queryRaw `select product_name, version, amount from orders JOIN consumer ON consumer.id = consumer_id JOIN item ON item.id = item_id JOIN version ON version.id = version_id JOIN product ON product.id = product_id WHERE consumer.id = ${form.conId} AND create_time = ${form.create_time} AND merchant_id = ${form.merId} AND order_status = true ;`;
        return foundRecord;
    }
    async getOrderInfo(form) {
        const foundOrder = await prisma.$queryRawUnsafe(`select orders.id, consumer_name, amount, product_name || ' ' || version AS full_name from orders JOIN item on item.id = item_id JOIN version ON version.id = version_id JOIN product ON product.id = product_id JOIN consumer ON consumer.id = consumer_id WHERE orders."QRcode" = '${form.QRcode}' AND merchant_id = ${form.merId} AND stock_status LIKE '%現貨' AND order_status = false;`);
        return foundOrder;
    }
    async updateOrder(orderId) {
        let orderInfo = {
            order_status: true,
        };
        const consumerUpdate = await prisma.order.update({
            where: { id: Number(orderId) },
            data: orderInfo,
        });
        return true;
    }
    async getAllProducts() {
        const getAllProducts = await prisma.product.findMany();
        return getAllProducts;
    }
    async getAllVersion() {
        const getAllVersion = await prisma.version.findMany();
        return getAllVersion;
    }
    async getMerchantInfo(userId) {
        const getMerchantId = await prisma.$queryRaw `select * from users join merchant on users.id = merchant.users_id where users.id = ${Number(userId)}`;
        return getMerchantId;
    }
};
exports.MerchantService = MerchantService = __decorate([
    (0, common_1.Injectable)()
], MerchantService);
//# sourceMappingURL=merchant.service.js.map