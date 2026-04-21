"use server";

import { HOST } from "@/urls/internal";
import { generateJwt, generateServerJwt } from "../../sign/actions";

export async function generateTiktokToken (code:string, isIframe?:boolean, clientId?:string) {
    const token = isIframe ? await generateServerJwt(clientId) : generateJwt()
    try {
        let authResponse = await fetch(`${HOST}/api/v1/tiktok/authorize`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                auth_code: code
            })
        });
        let auth = await authResponse.json();
        return auth;
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: 'Error authorizing Tiktok'
        };
    }
}