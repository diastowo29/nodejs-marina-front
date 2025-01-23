'use server'
import { INT_LIST_STORE_ByC } from "@/urls/internal";

export async function getListStores () {
    const storeRaw = await fetch(INT_LIST_STORE_ByC, { cache: 'no-store' });
    let error = false;
    try {
        const store = await storeRaw.json();
        return store;
    } catch (err) {
        console.error('Error fetching stores', err);
        error = true;
        throw err;
        // return {error: true};
    }
    // const store = await storeRaw.json();
    // return store;
}