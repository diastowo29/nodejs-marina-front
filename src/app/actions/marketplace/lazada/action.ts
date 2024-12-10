'use server'
// import * as crypto from "crypto";
import CryptoJS from 'crypto-js';
import { createClient } from 'redis';
const client = createClient();


const lazAuthHost = 'https://auth.lazada.com/rest';
const lazTokenApi = '/auth/token/create';

export async function generateToken (code:string) {
    let keyId = process.env.LAZ_APP_KEY_ID || 'abc';
    let keySecret = process.env.LAZ_APP_KEY_SECRET || 'abc';
    let ts = Date.now();
    let params = lazParamz(keyId, keySecret, code, ts, lazTokenApi)
    let tokenRaw = await fetch(`${lazAuthHost}${lazTokenApi}?${params.params}&sign=${params.signed}`);
    let token = await tokenRaw.json();
    console.log(token);
    if (token.code == '0') {
        client.connect();
        client.hSet('lazClient', {
            accToken: token.access_token,
            refToken: token.refresh_token
        })
    }
    return token;
}

function lazParamz (key:string, secret:string, code:string, ts:Number, endpoint:string) {
    let params = {
        app_key: key,
        timestamp: ts,
        code: code,
        sign_method: 'sha256'
        // ...(code=='' ? { access_token: accToken } : { code: code, refresh_token: refToken }),
    };
    // Sort alphabetically by key :*
    let sortedObject = Object.keys(params).sort().reduce((Obj:any, key:any) => {
        Obj[key] = params[key];
        return Obj;
    }, {});
    let joinedPresigned = endpoint;
    let joinedParams;
    for(let keys in sortedObject) {
        let joined = [keys, sortedObject[keys]].join('');
        joinedPresigned = [joinedPresigned, joined].join('');
        joined = [keys, sortedObject[keys]].join('=');
        if (joinedParams) {
            joinedParams = [joinedParams, joined].join('&');
        } else {
            joinedParams = [joinedParams, joined].join('');
        }
    }
    let signed = CryptoJS.HmacSHA256(joinedPresigned, secret).toString(CryptoJS.enc.Hex).toUpperCase();
    return {signed: signed, params: joinedParams};
}