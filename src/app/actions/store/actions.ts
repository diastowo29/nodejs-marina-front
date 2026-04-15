'use server'
import { INT_LIST_STORE_ByC } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

export async function getListStores () {
    console.log('Fetching store list from server...');
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
        console.error('Error fetching store list: ', err);
        return {
            error: true,
            message: 'Error fetching store list'
        };
    }
}

export async function getListStoresLite (referer:string, clientId:string) {
    try {
        const storeRaw = await fetch(`${INT_LIST_STORE_ByC}_lite?client_id=${clientId}`, { 
            cache: 'no-store',
            headers: {
                'iframe': 'true',
                'referer': referer,
                'client_id': clientId
            }
        })
        const storeData = await storeRaw.json();
        return storeData;
    } catch (err) {
        console.error('Error fetching store list: ', err);
        return {
            error: true,
            message: 'Error fetching store list'
        };
    }
}