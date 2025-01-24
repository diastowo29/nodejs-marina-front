'use server'
import { INT_GET_ORDER, INT_GET_ORDER_ByU, INT_ORDER_BYCHANNEL } from "@/urls/internal";

export async function getOrders (orderId:string) {
    const orderRaw = await fetch(INT_GET_ORDER(orderId));
    console.log(orderRaw);
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