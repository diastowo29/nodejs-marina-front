'use server'
import { INT_GET_ORDER, INT_GET_ORDER_ByU, INT_ORDER_BYCHANNEL, INT_UPDATE_ORDER } from "@/urls/internal";
// import { getAccessToken } from "@auth0/nextjs-auth0/edge";
// import { getAccessToken } from "@auth0/nextjs-auth0";
// import { popToast } from "../toast/pop";
import { generateJwt } from "../sign/actions";

export async function getOrders (orderId:string) {
    // try {
    //     let token = await getAccessToken();
    //     console.log(token)
    // } catch (err) {
    //     console.log(err)
    // }
    const orderRaw = await fetch(INT_GET_ORDER(orderId), {
        cache: 'no-store',
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
    });
    const order = await orderRaw.json();
    return order;
}

export async function getOrdersByUser (userId:string) {
    const orderRaw = await fetch(INT_GET_ORDER_ByU(userId), {
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
    });
    const order = await orderRaw.json();
    return order;
}

export async function getOrdersCnl (channel:string) {
    const orderRaw = await fetch(INT_ORDER_BYCHANNEL(channel), {
        cache: 'no-store',
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
    });
    const order = await orderRaw.json();
    return order;
}

export async function updateOrder (orderId:string, jsonPayload:object) {
    try  {
        const orderRaw = await fetch(INT_GET_ORDER(orderId),{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await generateJwt()
            },
            body: JSON.stringify(jsonPayload)
        });
        if (orderRaw.status !== 200) {
            let errorResponse = await orderRaw.json();
            return {
                status: orderRaw.status,
                data: {
                    error: true,
                    message: 'Error updating order',
                    response: errorResponse
                }
            }
        }
        const order = await orderRaw.json();
        return {
            status: orderRaw.status,
            data: order
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            data: {
                error: true,
                message: 'Error updating order'
            }
        }
    }
}

/* export async function updateOrders (orderId:string) {
    const orderRaw = await fetch(INT_GET_ORDER(orderId));
    const order = await orderRaw.json();
    return order;
} */