'use server'
import { INT_GET_ORDER } from "@/urls/internal";

export async function getOrders (orderId:string) {
    const orderRaw = await fetch(INT_GET_ORDER(orderId));
    const order = await orderRaw.json();
    return order;
}

export async function updateOrders (orderId:string) {
    const orderRaw = await fetch(INT_GET_ORDER(orderId));
    const order = await orderRaw.json();
    return order;
}