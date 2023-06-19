import { Prisma, Users } from "@prisma/client";
export declare class ConsumerService {
    getSelfInfo(userId: number): Promise<(Users & {
        consumers: import(".prisma/client").Consumer[];
    }) | null>;
    getQrCodeId(userId: string): void;
    uploadWishList(consumerId: number, productId: number, versionId: number, targetPrice: number, notification: boolean): Promise<void>;
    deleteWishList(consumerId: number, productId: number, versionId: number): Promise<Prisma.BatchPayload>;
    createOrder(itemID: string): void;
    paymentConfirm(paymentStatus: any): void;
    editConProfile(consumerId: any, form: any): Promise<import(".prisma/client").Consumer>;
    feedback(comment: any, merchantId: any, consumerId: any, rating: number): Promise<import(".prisma/client").Feedback>;
}
