"use server";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export const generateHmac = async (message:string, secret:string) => {
    let signString = await createHmac('sha256', secret).update(message).digest('hex');
    return signString;
}

export const generateJwt = async () => {
    const cookiesStore = await cookies();
    const orgId = cookiesStore.get('org_id')?.value;
    const userId = cookiesStore.get('user_id')?.value;
    // console.log(cookiesStore.getAll());
    const privateKey = fs.readFileSync('./private.key');
    const token = jwt.sign({
        time: Date(),
        user_id: userId,
        org_id: orgId
    }, privateKey, {algorithm: 'RS256'});
    return token;
}