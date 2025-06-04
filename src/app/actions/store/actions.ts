'use server'
import { INT_LIST_STORE_ByC } from "@/urls/internal";

export async function getListStores () {
    try {
        const storeRaw = await fetch(INT_LIST_STORE_ByC, { cache: 'no-store' })/* .catch(function (err) {
            console.log(err);
        }); */
        let error = false;
        const store = await storeRaw.json();
        return store;
    } catch (err) {
        return {
            error: true,
            message: 'Error fetching store list'
        };
    }
}