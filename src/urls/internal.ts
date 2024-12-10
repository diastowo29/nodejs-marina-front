const HOST = `http://localhost:3000`;
// const HOST = `https://4be4-122-129-96-106.ngrok-free.app`

export const INT_LIST_CHANNEL = `${HOST}/api/channels`;
export const INT_STORES = `${HOST}/api/stores`;
export const INT_ORDER_BYCHANNEL = (channel:string) => {
    return `${HOST}/api/orders?c=${channel}`;
};
export const INT_GET_ORDER = (orderId:string) => {
    return `${HOST}/api/orders/${orderId}`;
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

