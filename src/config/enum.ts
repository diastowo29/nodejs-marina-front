export enum marinaChannel {
    Tokopedia = 'Tokopedia',
    Shopee = 'Shopee',
    Tiktok = 'TikTok',
    BliBli = 'BliBli',
    Lazada = 'Lazada',
    Bukalapak = 'Bukalapak'
}

export enum marinaOrderStatus {
    New = 'New',
    Pending = 'Pending',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export enum marinaUrls {
    setting_marketplace = '/settings/marketplace',
    orders_page = '/orders'
}

export enum marinaPageNames {
    Orders = 'Orders'
}

export enum marinaStatusColor {
    BLUE = 'primary',
    PURPLE = 'secondary',
    GREEN = 'success',
    RED = 'danger',
    YELLOW = 'warning'
}

export enum marinaChatContent {
    TEXT = 'text',
    IMAGE = 'image',
    PRODUCT = 'product',
    INVOICE = 'invoice'
}

// export enum marinaEnv {
//     SHOPEE_REDIRECT_URL = ''
// }

export function cancelReasons (channel:string, status:string) {
    switch (channel) {
        case marinaChannel.Shopee.toLowerCase():
            return [
                {key: "CUSTOMER_REQUEST", label: "Customer Request"},
                {key: "OUT_OF_STOCK", label: "Out of Stock"},
                {key: "UNDELIVERABLE_AREA", label: "Unvdeliverable Area"},
                {key: "COD_NOT_SUPPORTED", label: "COD Not Suported"}
            ];
        case marinaChannel.Tiktok.toLowerCase():
            if ((status === 'ON_HOLD') || (status === 'AWAITING_SHIPMENT')) {
                return [
                    {key: "seller_cancel_reason_out_of_stock", label: "Out of stock"},
                    {key: "seller_cancel_reason_wrong_price", label: "Pricing error"},
                    {key: "seller_cancel_paid_reason_address_not_deliver", label: "Unable to deliver to buyer address"}
                ];
            } else if (status === 'UNPAID') {
                return [];
            } else if (status === 'ORDER_REQUEST_CANCEL') {
                return [
                    {key: "order_manage_list_action_respond_popup_reject_reason_invalid_cancellation_reason", label: "Invalid reason for cancellation"},
                    {key: "order_manage_list_action_respond_popup_reject_reason_delivered", label: "Product delivery is on schedule"},
                    {key: "order_manage_list_action_respond_popup_reject_reason_buyer_agree", label: "Reached an agreement with the buyer"},
                    {key: "seller_reject_apply_product_has_been_packed", label: "Product has been packed"},
                    {key: "system_cancel_failed_due_to_tts", label: "Order canceled by system"}
                ];
            } else {
                return [];
            }
        default:
            return [];
    }
}