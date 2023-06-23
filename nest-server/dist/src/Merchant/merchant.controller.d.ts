import { MerchantService } from "./merchant.service";
import { PublicService } from "src/Public/public.service";
export declare class MerchantController {
    private readonly merchantService;
    private readonly publicService;
    constructor(merchantService: MerchantService, publicService: PublicService);
    getSelfInfo(userId: any): Promise<unknown>;
    editMerProfile(merchantId: any, form: any): Promise<import(".prisma/client").Merchant>;
    getAllItem(userId: any): Promise<unknown>;
    uploadItems(form: any): Promise<{
        success: boolean;
        data: import(".prisma/client").Item;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    updateItems(form: any): void;
    changeItemStatus(itemId: number, formData: {
        stock_status: any;
    }): Promise<{
        success: boolean;
        data: import(".prisma/client").Item;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    pairUserId(parms: any): void;
    paymentConfirm(resultStatus: any): void;
    getAllProducts(): Promise<import(".prisma/client").Product[]>;
    getAllVersion(): Promise<import(".prisma/client").Version[]>;
}
