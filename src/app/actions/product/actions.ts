'use server'
import { INT_LIST_PRODUCT, INT_LIST_PRODUCT_ByS, INT_QUERY_PRODUCT_ByC, INT_SEARCH_PRODUCT } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

export async function getListProducts () {
    const productRaw = await fetch(INT_LIST_PRODUCT, { cache: 'no-store' });
    const product = await productRaw.json();
    return product;
}

export async function getProductByChannel (channelName: string) {
    if (channelName == undefined) {
        return null;
    }
    // console.log('calling endpoint: ', INT_QUERY_PRODUCT_ByC(channelName.toLowerCase()));
    const productRaw = await fetch(INT_QUERY_PRODUCT_ByC(channelName.toLowerCase()) , { 
        cache: 'no-store',
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
     });
    const product = await productRaw.json();
    return product;
}

export async function getListProductsbyStore(storeId: string) {
    const productRaw = await fetch(INT_LIST_PRODUCT_ByS(storeId), {
        cache: 'no-store',
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
    });
    const product = await productRaw.json();
    return product;
}

export async function getListProductsByChannel () {
    const productRaw = await fetch(INT_LIST_PRODUCT, {
        cache: 'no-store',
        headers: {
            'Authorization': 'Bearer ' + await generateJwt()
        }
    });
    const product = await productRaw.json();
    return product;
}

export async function searchProducts (query:string, storeId: number) {
    try {
        const productRaw = await fetch(INT_SEARCH_PRODUCT(query, storeId), {
            cache: 'no-store',
            headers: {
                'Authorization': 'Bearer ' + await generateJwt()
            }
        });
        const product = await productRaw.json();
        return product;
    } catch (err) {
        return {
            error: true,
            message: 'Error fetching store list'
        };
    }
}