'use server'

import { INT_STORES } from "@/urls/internal";

export async function createStore (payload:{}) {
    const storesRaw = await fetch(INT_STORES, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const stores = await storesRaw.json();
    return stores;
}

export async function getStores () {
    const storesRaw = await fetch(INT_STORES, {
        method: 'GET'
    });
    const stores = await storesRaw.json();
    return stores;
}