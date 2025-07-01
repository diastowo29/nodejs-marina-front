"use server";
import { createHmac } from "crypto";
import { auth0 } from "@/lib/auth0";

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