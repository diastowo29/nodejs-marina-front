'use server'
import { CHAT_ENDPOINT, INT_CHAT_COMMENTS, INT_GET_ORDER, INT_LIST_CHAT } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

export async function listChats () {
    console.log('chat endpoint:', INT_LIST_CHAT);
    const chatsRaw = await fetch(INT_LIST_CHAT, { 
        cache: 'no-store',
        headers: { 'Authorization': 'Bearer ' + await generateJwt() }
    });
    // console.log(chatsRaw);
    const chat = await chatsRaw.json();
    return chat;
}

export async function listChatComments (chatId:string) {
    const chatsRaw = await fetch(INT_CHAT_COMMENTS(chatId), { 
        cache: 'no-store',
        headers: { 'Authorization': 'Bearer ' + await generateJwt() }
    });
    const chat = await chatsRaw.json();
    return chat;
}

export async function updateChat (orderId:string) {
    const orderRaw = await fetch(INT_GET_ORDER(orderId), {
        headers: { 'Authorization': 'Bearer ' + await generateJwt() }
    });
    const order = await orderRaw.json();
    return order;
}

export async function replyChat (payload:{}) {
    const chatsRaw = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await generateJwt()
        },
        body: JSON.stringify(payload)
    });
    const chat = await chatsRaw.json();
    return chat;
}