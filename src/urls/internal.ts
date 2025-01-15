// const HOST = `http://localhost:3002`;
const HOST = 'https://marina-apps.et.r.appspot.com/';
// const HOST = `https://4be4-122-129-96-106.ngrok-free.app`

export const INT_LIST_CHANNEL = `${HOST}/api/v1/channels`;
export const INT_STORES = `${HOST}/api/stores`;
export const INT_ORDER_BYCHANNEL = (channel:string) => {
    return `${HOST}/api/v1/orders?c=${channel}`;
};
export const INT_GET_ORDER = (orderId:string) => {
    return `${HOST}/api/v1/orders/${orderId}`;
};
export const INT_GET_PRODUCT = (productId:string) => {
    return `${HOST}/api/products/${productId}`;
};
export const REPLY_CHAT = () => {
    return `${HOST}/api/chat/`;
};
export const INT_CHAT_COMMENTS = (chatId:string) => {
    return `${HOST}/api/chat/${chatId}/comments`;
};
export const INT_CREATE_STORE = (chatId:string) => {
    return `${HOST}/api/stores`;
};


