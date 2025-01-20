'use server'
import { INT_LIST_PRODUCT, INT_QUERY_PRODUCT_ByC } from "@/urls/internal";

export async function getListProducts () {
    const productRaw = await fetch(INT_LIST_PRODUCT, { cache: 'no-store' });
    const product = await productRaw.json();
    return product;
}

export async function getProductByChannel (channelName: string) {
    if (channelName == undefined) {
        return null;
    }
    const productRaw = await fetch(INT_QUERY_PRODUCT_ByC(channelName.toLowerCase()) , { cache: 'no-store' });
    const product = await productRaw.json();
    return product;
}

export async function getListProductsByChannel () {
    const productRaw = await fetch(INT_LIST_PRODUCT, { cache: 'no-store' });
    const product = await productRaw.json();
    return product;
}