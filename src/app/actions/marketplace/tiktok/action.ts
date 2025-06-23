"use server";

import { HOST } from "@/urls/internal";
import { generateJwt } from "../../sign/actions";

export async function generateTiktokToken (code:string) {
    try {
        let authResponse = await fetch(`${HOST}/api/v1/tiktok/authorize`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + await generateJwt()
            },
            body: JSON.stringify({
                auth_code: code
            })
        });
    
        let auth = await authResponse.json();
        return auth;
    } catch (err) {
        return {
            error: true,
            message: 'Error fetching store list'
        };
    }
}