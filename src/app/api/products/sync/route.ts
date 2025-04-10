// import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server';
import { createToko } from '@/data/products/productsPayload';
// import { TOKO_GETTOKEN, TOKO_PRODUCTLIST } from '@/urls/tokopedia';
// const prisma = new PrismaClient()

let sampleFsId = '18229';
let sampleShopId = '16300072';

export async function GET(request: NextRequest) {
    // const token = await prisma.cred_channel.findUnique({where: {id: 1}});
    // const clientIdSecret = btoa(`${token?.clientId}:${token?.clientSecret}`);
    // const accessToken = `${token?.tokenType} ${token?.accToken}`;
    // const tokoProductList = await callWithRetry(TOKO_PRODUCTLIST(sampleFsId, sampleShopId), 'GET', accessToken, clientIdSecret, token!.id);
    // tokoProductList.data.forEach(async (product:any) => {
    //     const basicInfo = product.basic;
    //     const synced = await prisma.main_products.upsert({
    //         where: {
    //             origin_id: basicInfo.productID.toString()
    //         },
    //         update: {},
    //         create: createToko(product)
    //     });
    //     console.log(synced.id);
    // });
    // return Response.json(tokoProductList);
    return Response.json({});

}

// async function callWithRetry (url: string, method:string, credential:string, clientIdSecret:string, tokenId:number) {
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
//             const tokenRawResponse = await refreshTokoToken(clientIdSecret);
//             if (tokenRawResponse.status == 200) {
//                 console.log('GET TOKEN', tokenRawResponse.status);
//                 const tokenResponse = await tokenRawResponse.json();
//                 const credUpdate = await prisma.cred_channel.update({
//                     data: {
//                         accToken: tokenResponse.access_token
//                     },
//                     where: {
//                         id:tokenId
//                     }
//                 });
//                 const rawResponse = await fetch(url, {
//                     method: method,
//                     headers: {
//                       'Accept': 'application/json',
//                       'Content-Type': 'application/json',
//                       'Authorization': `Bearer ${tokenResponse.access_token}`
//                     },
//                 });
//                 return await rawResponse.json();
//             }
//         } else if (rawResponse.status == 200) {
//             console.log('valid');
//             return await rawResponse.json();
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