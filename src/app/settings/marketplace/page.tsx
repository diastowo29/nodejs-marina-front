// "use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";
import { getListStores } from "@/app/actions/store/actions";
import MarketplaceList from "@/components/Settings/MarketplaceList";
import SidebarSetting from "@/components/Settings/SidebarSettings";
import AddMarketplace from "@/components/Settings/AddMarketplace";
import { popToast } from "@/app/actions/toast/pop";
import { generateHmac } from "@/app/actions/sign/actions";

// export const metadata: Metadata = {
//   title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

// const fetcher = (url:any) => fetch(url).then((r) => r.json())

const Settings = async () => {
  // console.log(process.env.NEXT_PUBLIC_AUTH0_BASE_URL);
  // let host = process.env.NEXT_PUBLIC_AUTH0_BASE_URL;
  // let lazadaAuth = 'https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true';
  // let callbackEndpoint = `${host}/settings/marketplace`;

  /* NEED USECLIENT BUT NOT SUPPPORT ASYNC */
/*   let params = useSearchParams();
  let authCode:any = params.get('code');
  let appsNumber:any = params.get('app');
  console.log(authCode);
  console.log(appsNumber); */
  /* if (authCode) {
    let isSuccess = generateToken(authCode, appsNumber);
    console.log(isSuccess);
  } */
  let shopeeAuthPath = '/api/v2/shop/auth_partner';
  let ts = Math.floor(Date.now() / 1000);

  const partnerId = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_ID;
  const partnerKey = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_KEY;
  const shopeeString = `${partnerId}${shopeeAuthPath}${ts}`;
  let shopeeAuthHost = process.env.NEXT_PUBLIC_SHOPEE_HOST || `https://partner.test-stable.shopeemobile.com`;
  let shopeeSignedString = await generateHmac(shopeeString, partnerKey as string);
  // console.log(shopeeSignedString)
  let lazadaChatKeyId = process.env.NEXT_PUBLIC_LAZ_APP_CHAT_KEY_ID;
  let lazadaOmsKeyId = process.env.NEXT_PUBLIC_LAZ_APP_OMS_KEY_ID;
  let host = process.env.APP_BASE_URL;

  let stores = await getListStores();
  return (
    <DefaultLayout>
      {/* <div className="mx-auto max-w-270"> */}
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-2 max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <SidebarSetting selected="store"/>
          </div>
          <Card className="col-span-5">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">CRM Integration</p>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <p>Connect your stores to Marina.</p>
              <AddMarketplace marinaHost={host} shopeeHost={shopeeAuthHost} shopeeString={shopeeSignedString} lazadaChatKey={lazadaChatKeyId} lazadaOmsKey={lazadaOmsKeyId}/>
              <MarketplaceList stores={stores} shopeeString={shopeeSignedString}></MarketplaceList>
            </CardBody>
            <Divider/>
          </Card>
        </div>
    </DefaultLayout>
  );
};

export default Settings;
