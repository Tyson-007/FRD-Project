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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
const hash_1 = require("./hash");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma = new client_1.PrismaClient();
let PublicService = exports.PublicService = class PublicService {
    getHot() {
        throw new Error("Method not implemented.");
    }
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async Register(form, identity, files) {
        async function conRegister(form, users_id) {
            let consumer;
            consumer = {
                users: { connect: { id: users_id } },
                QRcode: form.QRcode,
                consumer_name: form.consumer_name,
                consumer_phone: form.consumer_phone,
            };
            const createConsumer = await prisma.consumer.create({ data: consumer });
            return createConsumer;
        }
        async function merRegister(form, users_id, files) {
            console.log("files: ", files);
            console.log("form: ", form);
            let merchant;
            merchant = {
                users_id: users_id,
                merchant_image: files.IconImg[0].buffer,
                merchant_name: form.name,
                merchant_phone: form.phone,
                biz_registration: files.RegisImg[0].buffer,
                district_id: parseInt(form.district),
                address: form.address,
                branch_id: parseInt(form.branch),
                bank_account: form.accNum,
                opening_hour: form.Hour,
            };
            const createMerchant = await prisma.merchant.create({ data: merchant });
            console.log(createMerchant);
            return createMerchant;
        }
        async function registerCondition(form, identity) {
            let hashedPassword = await (0, hash_1.hashPassword)(form.password);
            let users;
            users = {
                username: form.username,
                password: hashedPassword,
                email: form.email,
                identity: identity,
            };
            const createUser = await prisma.users.create({ data: users });
            let users_id = Number(createUser.id);
            return { form, users_id, files };
        }
        if (identity === "consumer") {
            registerCondition(form, identity)
                .then((output) => {
                conRegister(output.form, output.users_id);
            })
                .then(async () => {
                await prisma.$disconnect();
            })
                .catch(async (e) => {
                console.error(e);
                await prisma.$disconnect();
                process.exit(1);
            });
        }
        else if (identity === "merchant") {
            registerCondition(form, identity)
                .then((output) => {
                merRegister(output.form, output.users_id, output.files);
            })
                .then(async () => {
                await prisma.$disconnect();
            })
                .catch(async (e) => {
                console.error(e);
                await prisma.$disconnect();
                process.exit(1);
            });
        }
    }
    async selectArea() {
        const selectArea = await prisma.area.findMany();
        return selectArea;
    }
    async selectDistrict() {
        const selectDistrict = await prisma.district.findMany();
        return selectDistrict;
    }
    async bank() {
        const bank = await prisma.bank.findMany();
        return bank;
    }
    async branch() {
        const branch = await prisma.branch.findMany();
        return branch;
    }
    async login(form) {
        const user = await this.prisma.users.findUnique({
            where: { username: form.username },
            select: { id: true, password: true, identity: true },
        });
        if (!user || !(await (0, hash_1.checkPassword)(form.password, user.password))) {
            throw new common_1.UnauthorizedException();
        }
        return this.signToken(user.id, user.identity);
    }
    async signToken(userId, userIdentity) {
        const payload = { signId: userId, signIdentity: userIdentity };
        console.log(this.config.get("JWT_SECRET"));
        return {
            access_token: await this.jwt.signAsync(payload, {
                expiresIn: "1d",
                secret: this.config.get("JWT_SECRET"),
            }),
        };
    }
    hot() {
        console.log(`arrange by views`);
        return "Test";
    }
    async comingSoon() {
        const limit = 10;
        const comingSoon = await prisma.product.findMany({
            orderBy: {
                release_date: "desc",
            },
            take: limit,
        });
        return comingSoon;
        console.log(`select products by a desc of time `);
    }
    async displayTag() {
        const homeTag = await prisma.tag.findMany();
        return homeTag;
        console.log(`display Tag filter in Homepage`);
    }
    async displayPlatform() {
        const homePlatform = await prisma.platform.findMany();
        return homePlatform;
        console.log(`display platform filter in Homepage`);
    }
    async platformFilter(platformName) {
        const platform = await this.prisma.platform.findMany({
            where: {
                platform: {
                    equals: platformName,
                },
            },
            include: {
                products: {
                    include: {
                        versions: true,
                    },
                },
            },
        });
        return platform;
    }
    async tagFilter(tags) {
        const tagIds = await this.prisma.tag
            .findMany({
            where: {
                tag: {
                    in: tags,
                },
            },
            select: {
                id: true,
            },
        })
            .then((tags) => tags.map((tag) => tag.id));
        const product = await this.prisma.product.findMany({
            where: {
                product_tags: {
                    some: {
                        tag: {
                            id: {
                                in: tagIds,
                            },
                        },
                    },
                },
            },
            include: {
                product_tags: true,
            },
        });
        console.log("using query to get all value which is NOT repeat", tags);
        return product;
    }
    async searchVersion(id) {
        console.log(id);
        const value = `${id}`;
        const version = await prisma.$queryRaw ` select version.id as version_id,* from version join product on product.id = product_id where product_id = (${value}::integer) ;`;
        return version;
    }
    async searchItem(version_id) {
        console.log(version_id);
        const value = `${version_id}`;
        const items = await prisma.$queryRaw `select item.id as item_id,item.price,item.stock_status,item.availability,item.end_date,merchant_name,merchant_phone,merchant.address,district.district from item join merchant on merchant_id = merchant.id join district on district.id = merchant.district_id where version_id=(${value}::integer);`;
        return items;
    }
    async getMerchantByItemId(itemId) {
        const item = await prisma.item.findUnique({
            where: {
                id: itemId,
            },
            include: {
                merchant: true,
            },
        });
        if (!item) {
            throw new Error("Item not found");
        }
        return {
            itemId: item.id,
            merchantId: item.merchant.id,
            merchantName: item.merchant.merchant_name,
            merchantPhone: item.merchant.merchant_phone,
        };
    }
    async searchText(Text) {
        console.log("i am service", Text);
        let value = `%${Text}%`;
        console.log(value);
        const result = await prisma.$queryRaw `select * from product where product_name like ${value};`;
        return result;
    }
    async version(productId, versionId) {
        const version = await prisma.version.findUnique({
            where: {
                id: versionId,
            },
            include: {
                items: true,
            },
        });
        if (!version || version.product_id !== productId) {
            throw new Error("Version not found");
        }
        const items = version.items.map((item) => ({
            itemId: item.id,
            merchantId: item.merchant_id,
        }));
        const merchants = await Promise.all(items.map((item) => this.getMerchantByItemId(item.itemId)));
        return {
            versionId: version.id,
            versionName: version.version,
            items: items.map((item, index) => ({
                itemId: item.itemId,
                merchant: merchants[index],
            })),
        };
    }
    district(productid, versionId, district) {
        console.log(`select all items with props`, productid, versionId, district);
    }
    area(productid, versionId, area) {
        console.log(`select all items with props`, productid, versionId, area);
    }
    async priceDesc(productid, versionId) {
        const item = await prisma.item.findMany({
            orderBy: {
                price: "desc",
            },
            include: {
                version: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return item;
        console.log(`set price desc`, productid, versionId);
    }
    async priceAsec(productid, versionId) {
        const item = await prisma.item.findMany({
            orderBy: {
                price: "asc",
            },
            include: {
                version: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return item;
        console.log(`set price asec`, productid, versionId);
    }
    ratingDesc(productid, versionId) {
        console.log(`set rating asce`, productid, versionId);
    }
    ratingAsce(productid, versionId) {
        console.log(`set rating asce`, productid, versionId);
    }
    displayOrderHistory(JWTpayload) {
        console.log(`display order history by userId`, JWTpayload);
    }
    async getProductInfo(productId) {
        const foundProduct = await prisma.$queryRawUnsafe(`select product_name, product_image, release_date, product_intro, platform, tag from product JOIN platform ON platform.id = platform_id JOIN product_tag ON product.id = product_id JOIN tag ON tag.id = tag_id WHERE product.id = ${productId};`);
        return foundProduct;
    }
    async getProductItem(productId) {
        const foundItem = await prisma.$queryRawUnsafe(`select item.id, product_name, version, merchant_id, merchant_name, address, district, area, stock_status, price from product JOIN version ON product.id = product_id JOIN item ON version.id = version_id JOIN merchant ON merchant.id = merchant_id JOIN district on district.id = district_id JOIN area on area.id = area_id where product.id = ${productId} AND item.availability = true;`);
        return foundItem;
    }
    async getProductVersion(productId) {
        const foundVersion = await prisma.$queryRawUnsafe(`select version.id, version from product JOIN version ON product.id = product_id JOIN platform ON platform.id = platform_id where product.id = ${productId};`);
        return foundVersion;
    }
    async getVersionItem(versionId) {
        const foundItem = await prisma.$queryRawUnsafe(`select item.id, product_name, version, merchant_id, merchant_name, address, district, area, stock_status, price from product JOIN version ON product.id = product_id JOIN item ON version.id = version_id JOIN merchant ON merchant.id = merchant_id JOIN district on district.id = district_id JOIN area on area.id = area_id where version.id = ${versionId} AND item.availability = true;`);
        return foundItem;
    }
};
exports.PublicService = PublicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], PublicService);
//# sourceMappingURL=public.service.js.map