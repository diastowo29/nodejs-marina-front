"use server";
import { createHmac } from "crypto";

export const generateHmac = (message:string, secret:string) => {
    return createHmac('sha256', secret).update(message).digest('hex');
}