'use server'
import { CRM_ENDPOINT, HANDSHAKE_SUNCO, HANDSHAKE_ZD } from "@/urls/internal";
import { generateJwt, generateServerJwt } from "../sign/actions";

export async function upsertCrm (payload:{}, iframe?:boolean, clientId?:string) {
    const token = (iframe) ? await generateServerJwt(clientId) : await generateJwt();
    const crmRaw = await fetch(`${CRM_ENDPOINT}/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token },
        body: JSON.stringify(payload)
    });
    const crm = await crmRaw.json();
    return crm;
}

export async function createCrm (payload:{}) {
    const crmRaw = await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + await generateJwt() },
        body: JSON.stringify(payload)
    });
    const crm = await crmRaw.json();
    return crm;
}

export async function updateCrm (payload:{}, id:string) {
    const crmRaw = await fetch(`${CRM_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + await generateJwt() },
        body: JSON.stringify(payload)
    });
    const crm = await crmRaw.json();
    return crm;
}

export async function deleteCrm (id:string) {
    try {
        const crmRaw = await fetch(`${CRM_ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + await generateJwt() }
        });
        const crm = await crmRaw.json();
        return crm;
    } catch (err) {
        return {
            error: true,
            message: 'Error delete CRM'
        }
    }
}

export async function getCrm (iframe?:boolean, clientId?:string) {
    const token = (iframe) ? await generateServerJwt(clientId) : await generateJwt();
    try {
        const storesRaw = await fetch(CRM_ENDPOINT, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const stores = await storesRaw.json();
        return stores;
    } catch (err) {
        return {
            error: true,
            message: 'Error fetching CRM list'
        }
    }
}

export async function handshakeCrm (host:string, token:string) {
    try {
        const hsRaw = await fetch(HANDSHAKE_ZD(host), {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + token }
        });
        const hs = await hsRaw.json();
        return hs;
    } catch (err) {
        return {
            error: true,
            message: 'Error Handshake CRM'
        }
    }
}


export async function handshakeSunco (appsId:string, token:string) {
    try {
        const suncoRaw = await fetch(HANDSHAKE_SUNCO(appsId), {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + token }
        });
        const sunco = await suncoRaw.json();
        return sunco;
    } catch (err) {
        return {
            error: true,
            message: 'Error fetching CRM list'
        }
    }
}