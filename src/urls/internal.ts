// const HOST = process.env.BACKEND_HOST || `https://marina-apps.et.r.appspot.com`;
const HOST = process.env.BACKEND_HOST || `http://localhost:3002`;

let CHANNEL_ENDPOINT = `${HOST}/api/v1/channels`;
let PRODUCT_ENDPOINT = `${HOST}/api/v1/products`;
let ORDER_ENDPOINT = `${HOST}/api/v1/orders`;
export const CHAT_ENDPOINT = `${HOST}/api/v1/chats`;
let STORE_ENDPOINT = `${HOST}/api/v1/stores`;
export const CRM_ENDPOINT = `${HOST}/api/v1/crm`;

export const INT_STORES = STORE_ENDPOINT;
export const INT_LIST_CHAT = CHAT_ENDPOINT;
export const INT_LIST_CHANNEL = CHANNEL_ENDPOINT;
export const INT_LIST_STORE_ByC = `${CHANNEL_ENDPOINT}/stores`;
export const INT_LIST_PRODUCT = PRODUCT_ENDPOINT;
export const CHANNEL_PRODUCT_API = `${CHANNEL_ENDPOINT}/products`;

// export const HANDSHAKE_SUNCO = 'https://api.smooch.io/v2/apps/5ea6f52b536ecb000f732a35/integrations';

export const HANDSHAKE_ZD = (host:string) => {
    return `${host}/api/v2/users/me.json`;
}

export const HANDSHAKE_SUNCO = (appsId:string) => {
    return `https://api.smooch.io/v2/apps/${appsId}/integrations`;
}

export const INT_LIST_PRODUCT_ByC = (channelId:string) => {
    return `${CHANNEL_ENDPOINT}/${channelId}/products`;
};
export const INT_QUERY_PRODUCT_ByC = (channelName:string) => {
    return `${PRODUCT_ENDPOINT}?c=${channelName}`;
};
export const INT_FIND_ONE_PRODUCT = (productId:string) => {
    return `${PRODUCT_ENDPOINT}/${productId}`;
};
export const INT_ORDER_BYCHANNEL = (channel:string) => {
    return `${ORDER_ENDPOINT}?c=${channel}`;
};
export const INT_GET_ORDER = (orderId:string) => {
    return `${ORDER_ENDPOINT}/${orderId}`;
};
export const INT_GET_ORDER_ByU = (userId:string) => {
    return `${ORDER_ENDPOINT}?u=${userId}`;
};
export const INT_CHAT_COMMENTS = (chatId:string) => {
    return `${CHAT_ENDPOINT}/${chatId}/comments`;
};
