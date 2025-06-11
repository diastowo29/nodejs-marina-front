"use server";
import { createHmac } from "crypto";

export const generateHmac = async (message:string, secret:string) => {
    let signString = await createHmac('sha256', secret).update(message).digest('hex');
    return signString;
}