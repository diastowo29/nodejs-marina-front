// const HOST = 'https://fs.tokopedia.net';
// export const TOKO_GETTOKEN = 'https://accounts.tokopedia.com/token?grant_type=client_credentials';
// export const TOKO_SHOPINFO = (fsId:string) => {
//     return `${HOST}/v1/shop/fs/${fsId}/shop-info?page=1&per_page=10`
// }
// export const TOKO_PRODUCTLIST = (fsId:string, shopId:string) => {
//     return `${HOST}/inventory/v1/fs/${fsId}/product/info?shop_id=${shopId}&page=1&per_page=10`;
// }
// export const TOKO_PRODUCTGET = (fsId:string, productId:string) => {
//     return `${HOST}/inventory/v1/fs/${fsId}/product/info?product_id=${productId}`
// }
// export const TOKO_ACCEPT_ORDER = (fsId:string, orderId:string) => {
//     return `${HOST}/v1/order/${orderId}/fs/${fsId}/ack`;
// };
// export const TOKO_REJECT_ORDER = (fsId:string, orderId:string) => {
//     return `${HOST}/v1/order/${orderId}/fs/${fsId}/nack`;
// };
// export const TOKO_REPLYCHAT = (fsId:string, msgId:string) => {
//     return `${HOST}/v1/chat/fs/${fsId}/messages/${msgId}/reply`;
// }
// export const TOKO_PRINTLABEL = (fsId:string, orderId:string) => {
//     return `${HOST}/v1/order/${orderId}/fs/${fsId}/shipping-label`;
// }
// export const TOKO_ORD_CONFIRMSHIP = (fsId:string, orderId:string) => {
//     return `${HOST}/v1/order/${orderId}/fs/${fsId}/status`;
// }
// export const TOKO_CATEGORY = (fsId:string) => {
//     return `${HOST}/inventory/v1/fs/${fsId}/product/category`
// }