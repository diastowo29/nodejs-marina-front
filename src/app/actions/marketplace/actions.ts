'use server'

import { INT_STORES } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

export async function createStore (payload:{}) {
    const storesRaw = await fetch(INT_STORES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await generateJwt()
        },
        body: JSON.stringify(payload)
    });
    const stores = await storesRaw.json();
    return stores;
}

export async function getStores () {
    const storesRaw = await fetch(INT_STORES, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
    });
    const stores = await storesRaw.json();
    return stores;
}