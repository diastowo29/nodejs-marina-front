// import { TOKO_GETTOKEN, TOKO_REPLYCHAT } from '@/urls/tokopedia';
// import { PrismaClient } from '@prisma/client'
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextRequest, NextResponse } from 'next/server';
// const prisma = new PrismaClient()

export async function GET() {
    // const chats = await prisma.omnichat.findMany({
    //     include: {
    //         store: {
    //             include: {
    //                 channel: true
    //             }
    //         },
    //         omnichat_user: true
    //     }
    // })
    // return Response.json({chats});
    return Response.json({});
}

export async function POST(request:Request) {
    // const req = await request.json();
    // const token = await prisma.cred_channel.findFirst({where: {channelId: req.channel_id}});
    // const clientIdSecret = btoa(`${token?.clientId}:${token?.clientSecret}`);
    // const accessToken = `${token?.tokenType} ${token?.accToken}`;
    // const replyTo = req.id.split('-')[0];
    // const mathRandom = Math.floor(Math.random() * 90000) + 10000
    // const newChat = await prisma.omnichat_line.create({
    //     data: {
    //         line_text: req.line_text,
    //         author: 'agent',
    //         origin_id: `${replyTo}-${mathRandom}`,
    //         omnichatId: req.omnichatId
    //     }
    // });
    // const tokoReplyPayload = {
    //     shop_id: Number.parseInt(req.shop_id),
    //     message: req.line_text
    // }

    // const sendReply = await callWithRetry(TOKO_REPLYCHAT(token?.appId!, replyTo), 'POST', accessToken, clientIdSecret, token!.id, tokoReplyPayload)
    // console.log(sendReply);
    // return Response.json(sendReply);
    return Response.json({});


    // console.log(req);
    // console.log(token);
    // return Response.json({})
}

/* async function callWithRetry (url: string, method:string, credential:string, clientIdSecret:string, tokenId:number, payload:{}) {

    try {
        const requestPayload = {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `${credential}`
            },
            ...(method=='POST' ? {body: JSON.stringify(payload)} : {})
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
                const credUpdate = await prisma.cred_channel.update({
                    data: {
                        accToken: tokenResponse.access_token
                    },
                    where: {
                        id:tokenId
                    }
                });
                const rawResponse = await fetch(url, {
                    method: method,
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${tokenResponse.access_token}`,
                    },
                    ...(method=='POST' ? {body: JSON.stringify(payload)} : {})
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

async function refreshTokoToken (clientIdSecret:string) {
    return await fetch(TOKO_GETTOKEN, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${clientIdSecret}`
        },
    });
} */