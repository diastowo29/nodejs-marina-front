"use server";
import {TOKO_ACCEPT_ORDER, TOKO_GETTOKEN} from '@/urls/tokopedia';
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export async function tokopediaReplyChat() {}

export async function tokopediaAckOrder(orderId:string) {
    // const token = await prisma.cred_channel.findFirst({where: {channelId: req.channel_id}});
    // const clientIdSecret = btoa(`${token?.clientId}:${token?.clientSecret}`);
    // const accessToken = `${token?.tokenType} ${token?.accToken}`;
    // callWithRetry(TOKO_ACCEPT_ORDER('', orderId), 'POST', '', '', '', {})
}

export async function tokopediaNackOrder() {}

async function callWithRetry(
    url : string,
    method : string,
    credential : string,
    clientIdSecret : string,
    tokenId : number,
    payload : {}
) {
    try {
        const requestPayload = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${credential}`
            },
            ...(
                method == 'POST'
                    ? {
                        body: JSON.stringify(payload)
                    }
                    : {}
            )
        }
        // console.log(requestPayload);
        const rawResponse = await fetch(url, requestPayload);
        // console.log(rawResponse);

        if (rawResponse.status == 401) {
            console.log('TOKEN EXPIRED');
            const tokenRawResponse = await refreshTokoToken(clientIdSecret);
            if (tokenRawResponse.status == 200) {
                console.log('GET TOKEN', tokenRawResponse.status);
                const tokenResponse = await tokenRawResponse.json();
                const credUpdate = await prisma
                    .cred_channel
                    .update({
                        data: {
                            accToken: tokenResponse.access_token
                        },
                        where: {
                            id: tokenId
                        }
                    });
                const rawResponse = await fetch(url, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenResponse.access_token}`
                    },
                    ...(
                        method == 'POST'
                            ? {
                                body: JSON.stringify(payload)
                            }
                            : {}
                    )
                });
                return await rawResponse.json();
            }
        } else if (rawResponse.status == 200) {
            console.log('valid');
            return await rawResponse.json();
        } else {
            console.log(rawResponse.status);
        }
    } catch (err) {
        console.log('API call error: ', err);
        throw err;
    }
}

async function refreshTokoToken(clientIdSecret : string) {
    return await fetch(TOKO_GETTOKEN, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${clientIdSecret}`
        }
    });
}