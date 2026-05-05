'use server'

import { HOST } from "@/urls/internal";
import { generateJwt, generateServerJwt } from "../../sign/actions";

export async function updateOrder (orderId:string) {
    let authResponse = await fetch(`${HOST}/api/v1/lazada/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + await generateJwt()
        },
        body: JSON.stringify({
            process: 'pack'
        })
    });
    return authResponse;
}

export async function generateLazToken (lazadaParams: any) {
    const token = lazadaParams.iframe ? await generateServerJwt(lazadaParams.clientId) : await generateJwt()
    try {
        let authResponse = await fetch(`${HOST}/api/v1/lazada/authorize`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                code: lazadaParams.code,
                app: lazadaParams.app
            })
        });
    
        let auth = await authResponse.json();
        return auth;
    } catch (error) {
        console.error('Error generating Lazada token:', error);
        throw error;
    }
}