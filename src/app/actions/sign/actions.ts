"use server";
import { createHmac } from "crypto";
import { auth0 } from "@/lib/auth0";
import crypto from 'crypto'

const secret_key = process.env.M_SECRET_KEY || "VWtCb1lYTnBZVEV5TTAwMGNqRnVZUT09"
const secret_iv = process.env.M_SECRET_IV || "c2ec6253add99f0c63d5621ed8de1f3f"
const encryption_method = process.env.ENCRYPTION_METHOD || "aes-256-cbc"

export async function generateHmac(message:string, secret:string) {
    try {
        const hmac = createHmac('sha256', secret);
        hmac.update(message);
        const signString = hmac.digest('hex');
        return signString;
    } catch (error) {
        console.error('Error generating HMAC:', error);
        return '';
    }
}

export const decryptAes = (encryptedData:string) => {
    const key = crypto
      .createHash('sha512')
      .update(secret_key)
      .digest('hex')
      .substring(0, 32);
    const encryptionIV = crypto
      .createHash('sha512')
      .update(secret_iv)
      .digest('hex')
      .substring(0, 16);
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV)
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    )
}

export const generateJwt = async () => {
    /* const cookiesStore = await cookies();
    const orgId = cookiesStore.get('org_id')?.value;
    const userId = cookiesStore.get('user_id')?.value;
    const privateKey = fs.readFileSync('./private.key');
    const token = jwt.sign({
        time: Date(),
        user_id: userId,
        org_id: orgId
    }, privateKey, {algorithm: 'RS256'});
     */
    const authToken = await auth0.getAccessToken();
    return authToken.token;
}