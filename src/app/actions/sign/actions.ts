"use server";
import { createHmac } from "crypto";
import { auth0 } from "@/lib/auth0";
import crypto from 'crypto'

const secret_key = process.env.M_SECRET_KEY || "xxx"
const secret_iv = process.env.M_SECRET_IV || "xxx"
const encryption_method = process.env.ENCRYPTION_METHOD || "xxx"

export async function generateShopeeAuthUrl() {
  let ts = Math.floor(Date.now() / 1000);
  let shopeeAuthPath = '/api/v2/shop/auth_partner';
  // let shopeeAuthPath = '/auth';
  const partnerId = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_ID;
  const partnerKey = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_KEY || 'xxx';
  const shopeeString = `${partnerId}${shopeeAuthPath}${ts}`;
  let shopeeAuthHost = (process.env.NEXT_PUBLIC_SHOPEE_HOST) ? `${process.env.NEXT_PUBLIC_SHOPEE_HOST}/api/v2/shop/auth_partner` :  `https://open.sandbox.test-stable.shopee.com/auth`;
  let host = process.env.APP_BASE_URL;
  try {
      const hmac = createHmac('sha256', partnerKey).update(shopeeString).digest('hex');
      return `${shopeeAuthHost}?auth_type=seller&partner_id=${partnerId}&redirect=${host}/settings/marketplace&response_type=code&timestamp=${ts}&sign=${hmac}`;
  } catch (error) {
      console.error('Error generating HMAC:', error);
      return '';
  }
}

export const decryptHash = (encryptedData:string) => {
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