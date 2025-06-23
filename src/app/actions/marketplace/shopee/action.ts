"use server";

import { HOST } from "@/urls/internal";
import { generateJwt } from "../../sign/actions";

export async function generateShopeeToken (code:string, shopId:string) {

    let authResponse = await fetch(`${HOST}/api/v1/shopee/authorize`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + await generateJwt()
        },
        body: JSON.stringify({
            code: code,
            shop_id: shopId
        })
    });

    let auth = await authResponse.json();
    return auth;
}