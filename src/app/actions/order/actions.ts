'use server'
import { INT_GET_ORDER, INT_GET_ORDER_ByU, INT_ORDER_BYCHANNEL } from "@/urls/internal";
// import { getAccessToken } from "@auth0/nextjs-auth0/edge";
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function getOrders (orderId:string) {
    try {
        let token = await getAccessToken();
        console.log(token)
    } catch (err) {
        console.log(err)
    }

    const orderRaw = await fetch(INT_GET_ORDER(orderId), {cache: 'no-store'});
    const order = await orderRaw.json();
    return order;
}

export async function getOrdersByUser (userId:string) {
    const orderRaw = await fetch(INT_GET_ORDER_ByU(userId));
    const order = await orderRaw.json();
    return order;
}

export async function getOrdersCnl (channel:string) {
    const orderRaw = await fetch(INT_ORDER_BYCHANNEL(channel));
    const order = await orderRaw.json();
    return order;
}

export async function updateOrders (orderId:string) {
    const orderRaw = await fetch(INT_GET_ORDER(orderId));
    const order = await orderRaw.json();
    return order;
}