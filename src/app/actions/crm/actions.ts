'use server'

import { INT_STORES } from "@/urls/internal";
import * as crypto from "crypto";

export async function createCrm (payload:{}) {
    const storesRaw = await fetch(INT_STORES, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const stores = await storesRaw.json();
    return stores;
}

export async function getCrm () {
    const storesRaw = await fetch(INT_STORES, {
        method: 'GET'
    });
    const stores = await storesRaw.json();
    return stores;
}