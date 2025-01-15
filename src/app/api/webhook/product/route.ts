// import { PrismaClient } from '@prisma/client'
import { createToko } from '@/data/products/productsPayload';
import { TOKO_PRODUCTGET, TOKO_GETTOKEN } from '@/urls/tokopedia';
import { NextResponse } from 'next/server';
// const prisma = new PrismaClient()

export async function POST(request:Request) {
    // const req = await request.json();
    // const token = await prisma.cred_channel.findUnique({
    //     include: {
    //         channel: true
    //     },
    //     where: {
    //         id: 1
    //     }
    // });
    // const clientIdSecret = btoa(`${token?.clientId}:${token?.clientSecret}`);
    // const accessToken = `${token?.tokenType} ${token?.accToken}`;
    // const tokoProductResponseRaw = await callWithRetry(TOKO_PRODUCTGET(req.fs_id, req.success_rows_data[0].product_id), 'GET', accessToken, clientIdSecret);
    // const tokoProduct = await tokoProductResponseRaw?.json();
    // if (tokoProductResponseRaw?.status == 200) {
    //     // console.log(tokoProduct);
    //     let basicInfo = tokoProduct.data[0].basic;
    //     const createProduct = await prisma.main_products.upsert({
    //         where: {
    //             origin_id: basicInfo.productID.toString(),
    //         },
    //         update: {},
    //         create: createToko(tokoProduct.data[0])
    //     });
    //     return NextResponse.json(createProduct, {status:tokoProductResponseRaw?.status});
    // } else {
    //     return NextResponse.json(tokoProduct, {status: tokoProductResponseRaw?.status});
    // }
    return Response.json({});

}

// async function callWithRetry (url: string, method:string, credential:string, clientIdSecret:string) {
//     try {
//         const rawResponse = await fetch(url, {
//             method: method,
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//               'Authorization': `${credential}`
//             },
//         });

//         if (rawResponse.status == 401) {
//             console.log('TOKEN EXPIRED');
//             const tokenRawResponse = await refreshTokoToken(clientIdSecret)
//             if (tokenRawResponse.status == 200) {
//                 console.log('GET TOKEN', tokenRawResponse.status);
//                 const tokenResponse = await tokenRawResponse.json();
//                 const rawResponse = await fetch(url, {
//                     method: method,
//                     headers: {
//                       'Accept': 'application/json',
//                       'Content-Type': 'application/json',
//                       'Authorization': `Bearer ${tokenResponse.access_token}`
//                     },
//                 });
//                 return rawResponse;
//             }
//         } else if (rawResponse.status == 200) {
//             return rawResponse;
//         } else {
//             console.log(rawResponse.status);
//         }
//     } catch (err) {
//         console.log('API call error: ', err);
//         throw err;
//     }
// }

// async function refreshTokoToken (clientIdSecret:string) {
//     return await fetch(TOKO_GETTOKEN, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Basic ${clientIdSecret}`
//         },
//     });
// }