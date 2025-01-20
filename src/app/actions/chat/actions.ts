'use server'
import { INT_GET_ORDER, INT_LIST_CHAT } from "@/urls/internal";

export async function listChats () {
    const chatsRaw = await fetch(INT_LIST_CHAT, { cache: 'no-store' });
    console.log(chatsRaw);
    const chat = await chatsRaw.json();
    return chat;
}

export async function updateChat (orderId:string) {
    const orderRaw = await fetch(INT_GET_ORDER(orderId));
    const order = await orderRaw.json();
    return order;
}