'use server'
import { AUTH0_ENDPOINT } from "@/urls/internal";

export async function generateDb (postBody: any) {
    console.log(postBody)
    try {
        const hookRaw = await fetch(`${AUTH0_ENDPOINT}/hook`, { 
            cache: 'no-store',
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(postBody),
        })
        const hookData = await hookRaw.json();
        return hookData;
    } catch (err) {
        console.error('Error fetching hookData: ', err);
        return {
            error: true,
            message: 'Error fetching hookData'
        };
    }
}

export async function generateSchema (postBody: any) {
    console.log(postBody)
    try {
        const hookRaw = await fetch(`${AUTH0_ENDPOINT}/schema`, { 
            cache: 'no-store',
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(postBody),
        })
        const hookData = await hookRaw.json();
        return hookData;
    } catch (err) {
        console.error('Error fetching hookData: ', err);
        return {
            error: true,
            message: 'Error fetching hookData'
        };
    }
}