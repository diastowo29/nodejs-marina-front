'use server'
import { CRM_ENDPOINT, HANDSHAKE_SUNCO, HANDSHAKE_ZD, INT_STORES } from "@/urls/internal";
// import * as crypto from "crypto";

export async function createCrm (payload:{}) {
    // console.log(payload)
    const crmRaw = await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const crm = await crmRaw.json();
    return crm;
}

export async function getCrm () {
    const storesRaw = await fetch(INT_STORES, {
        method: 'GET'
    });
    const stores = await storesRaw.json();
    return stores;
}

export async function handshakeCrm (host:string, token:string) {
    const hsRaw = await fetch(HANDSHAKE_ZD(host), {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Basic ' + token, 
        })    
    });
    const hs = await hsRaw.json();
    return hs;
}


export async function handshakeSunco (appsId:string, token:string) {
    const suncoRaw = await fetch(HANDSHAKE_SUNCO(appsId), {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Basic ' + token, 
        })    
    });
    const sunco = await suncoRaw.json();
    return sunco;
}