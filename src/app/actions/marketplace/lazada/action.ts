'use server'
// import * as crypto from "crypto";
import CryptoJS from 'crypto-js';
import { createClient } from 'redis';
const client = createClient();
const lazAuthHost = 'https://auth.lazada.com/rest';
const lazTokenApi = '/auth/token/create';
let test = require('dotenv').config()

let backendHost = 'http://localhost:3002';


export async function updateOrder (orderId:string) {
    let authResponse = await fetch(`${backendHost}/api/v1/lazada/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            process: 'pack'
        })
    });
}

export async function generateToken (code:string) {

    let authResponse = await fetch(`${backendHost}/api/v1/lazada/authorize`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: code,
            app: 2
        })
    });

    let auth = await authResponse.json();
    console.log(auth);
    /* let keyId = test.parsed.LAZ_APP_KEY_ID || 'abc';
    // let keyId = process.env.LAZ_APP_KEY_ID || 'abc';
    let keySecret = test.parsed.LAZ_APP_KEY_SECRET || 'abc';
    // let keySecret = process.env.LAZ_APP_KEY_SECRET || 'abc';
    let ts = Date.now();
    let params = lazParamz(keyId, keySecret, code, ts, lazTokenApi)
    // console.log(params);
    let tokenRaw = await fetch(`${lazAuthHost}${lazTokenApi}?${params.params}&sign=${params.signed}`);
    let token = await tokenRaw.json();
    
    console.log(token);
    let updateStore = {}
    if (token.code == '0') {
        // client.connect();
        // client.hSet('lazClient', {
        //     accToken: token.access_token,
        //     refToken: token.refresh_token
        // })
        updateStore = {
            name: token.country_user_info[0].short_code,
            identifier: token.country_user_info[0].seller_id,
            channel: 'lazada',
            status: 'connect',
            token: token.access_token,
            refToken: token.refresh_token
        }
    } else {
        updateStore = {
            name: '',
            identifier: '',
            channel: 'lazada',
            status: 'failed'
        }
    }
    return token; */
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

const sampleTokenResponse = {
    access_token: '50000101931f6hdsqG9BfT3O0ylGmNhylszljYFrriv15dcfcaaoWvMr0exJaIJl',
    country: 'id',
    refresh_token: '50001100f31CCnqqbCbFyGhTiwxDffbsBmyVjHkMj3F18e29c6bqTFD1DXh5Iqev',
    account_platform: 'seller_center',
    refresh_expires_in: 15552000,
    country_user_info: [
        {
            country: 'id',
            user_id: '401488624381',
            seller_id: '401488624381',
            short_code: 'ID68E8L5TR'
        }
    ],
    expires_in: 2592000,
    account: 'Diastowo@gmail.com',
    code: '0',
    request_id: '21410fa017351987274536503'
};

const sampleTokenInvalid = {
    code: 'InvalidCode',
    type: 'ISP',
    message: 'Invalid authorization code',
    request_id: '212e56d217351987276763355'
}