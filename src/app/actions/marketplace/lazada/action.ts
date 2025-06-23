'use server'

import { HOST } from "@/urls/internal";
import { generateJwt } from "../../sign/actions";

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

export async function generateLazToken (code:string, apps:string) {

    let authResponse = await fetch(`${HOST}/api/v1/lazada/authorize`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + await generateJwt()
        },
        body: JSON.stringify({
            code: code,
            app: apps
        })
    });

    let auth = await authResponse.json();
    return auth;
}