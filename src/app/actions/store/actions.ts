'use server'
import { INT_LIST_STORE_ByC } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

export async function getListStores () {
    try {
        const storeRaw = await fetch(INT_LIST_STORE_ByC, { 
            cache: 'no-store',
            headers: {
                'Authorization': 'Bearer ' + await generateJwt()
            }
        })
        const store = await storeRaw.json();
        return store;
    } catch (err) {
        return {
            error: true,
            message: 'Error fetching store list'
        };
    }
}