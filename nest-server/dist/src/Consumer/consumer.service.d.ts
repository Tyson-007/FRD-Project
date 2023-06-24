import { Wishlist_product } from "@prisma/client";
import { Prisma } from "@prisma/client";
export declare class ConsumerService {
    getSelfInfo(userId: any): Promise<unknown>;
    displayWishList(consumer_id: number): Promise<(Wishlist_product & {
        product: import(".prisma/client").Product;
    })[]>;
    deleteOrder(id: number): Promise<unknown>;
    displayOrder(JWTpayload: any): Promise<unknown>;
    uploadWishList(consumerId: number, productId: number): Promise<void>;
    deleteWishList(consumerId: number, productId: number): Promise<Prisma.BatchPayload>;
    createOrder(form: any): Promise<unknown>;
    paymentConfirm(paymentArr: Array<number>): Promise<Promise<unknown>[]>;
    editUserProfile(userId: any, form: any): Promise<boolean>;
    editConProfile(conId: any, form: any): Promise<boolean>;
    editPassword(userId: any, form: any): Promise<boolean>;
    getHot(): Promise<unknown>;
}
