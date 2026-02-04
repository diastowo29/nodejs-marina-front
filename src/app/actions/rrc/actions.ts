'use server'
import { INT_GET_RRC } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

export async function getRrc (orderId:string) {
    const orderRaw = await fetch(INT_GET_RRC(orderId), {
        cache: 'no-store',
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
    });
    const order = await orderRaw.json();
    return order;
}