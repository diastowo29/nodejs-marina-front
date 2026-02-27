"use server";
import { createHmac } from "crypto";
import { auth0 } from "@/lib/auth0";
import crypto from 'crypto'

const secret_key = process.env.M_SECRET_KEY || "xxx"
const secret_iv = process.env.M_SECRET_IV || "xxx"
const encryption_method = process.env.ENCRYPTION_METHOD || "xxx"
const nodeEnv = process.env.NODE_ENV || "development";

export async function generateShopeeAuthUrl(payload:any) {
  let ts = Math.floor(Date.now() / 1000);
  let shopeeAuthPath = '/api/v2/shop/auth_partner';
  const identifier = (Object.keys(payload).length === 0) ? '' : payload.identifier;
  const partnerId = (identifier == '') ? process.env.NEXT_PUBLIC_SHOPEE_PARTNER_ID : identifier.split(':')[0];
  const partnerKey = (identifier == '') ? process.env.NEXT_PUBLIC_SHOPEE_PARTNER_KEY : identifier.split(':')[1];
  const shopeeHost = process.env.NEXT_PUBLIC_SHOPEE_HOST;
  let shopeeAuthHost = (shopeeHost) ? `${shopeeHost}/api/v2/shop/auth_partner` :  `https://open.sandbox.test-stable.shopee.com/auth`;
  let host = process.env.APP_BASE_URL;
  let redirectKey = 'redirect';
  if (nodeEnv === 'development') {
    shopeeAuthPath = '/auth';
    redirectKey = 'redirect_uri';
  }
  const shopeeString = `${partnerId}${shopeeAuthPath}${ts}`;
  try {
      const hmac = createHmac('sha256', partnerKey).update(shopeeString).digest('hex');
      return `${shopeeAuthHost}?auth_type=seller&partner_id=${partnerId}&${redirectKey}=${host}/settings/marketplace?id=${partnerId}&key=${partnerKey}&response_type=code&timestamp=${ts}&sign=${hmac}`;
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