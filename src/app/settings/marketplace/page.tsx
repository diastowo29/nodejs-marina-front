import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {Card, CardHeader, Divider, CardBody} from "@nextui-org/react";
import {getListStores} from "@/app/actions/store/actions";
import MarketplaceList from "@/components/Settings/MarketplaceList";
import SidebarSetting from "@/components/Settings/SidebarSettings";
import AddMarketplace from "@/components/Settings/AddMarketplace";
import {generateHmac} from "@/app/actions/sign/actions";
import {generateTiktokToken} from "@/app/actions/marketplace/tiktok/action";
import {generateShopeeToken} from "@/app/actions/marketplace/shopee/action";
import {generateLazToken} from "@/app/actions/marketplace/lazada/action";

const Settings = async ({searchParams} : {
    searchParams: Promise < {
        [key: string]: string
    } >
}) => {
    let isConnected = false;
    let channel = '';
    let urlParams = await searchParams;
    if (urlParams.code) {
        if (urlParams.app && urlParams.code) {
            /* LAZADA */
            channel = 'Lazada';
            let authorized = await generateLazToken(urlParams.code, urlParams.app);
            if (!authorized.error) {
                isConnected = true;
            }
        } else if (urlParams.shop_id && urlParams.code) {
            /* SHOPEE */
            channel = 'Shopee';
            let authorized = await generateShopeeToken(urlParams.code, urlParams.shop_id);
            if (!authorized.error) {
                isConnected = true;
            }
        } else if (urlParams.app_key && urlParams.code) {
            /* TIKTOK */
            channel = 'Tiktok';
            let authorized = await generateTiktokToken(urlParams.code);
            if (!authorized.error) {
                isConnected = true;
            }
        }
    }
    let shopeeAuthPath = '/api/v2/shop/auth_partner';
    let ts = Math.floor(Date.now() / 1000);

    const partnerId = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_ID;
    const partnerKey = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_KEY;
    const shopeeString = `${partnerId}${shopeeAuthPath}${ts}`;
    let shopeeAuthHost = process.env.NEXT_PUBLIC_SHOPEE_HOST || `https://partner.test-stable.shopeemobile.com`;
    let shopeeSignedString = await generateHmac(shopeeString, partnerKey as string);
    let lazadaChatKeyId = process.env.NEXT_PUBLIC_LAZ_APP_CHAT_KEY_ID;
    let lazadaOmsKeyId = process.env.NEXT_PUBLIC_LAZ_APP_OMS_KEY_ID;
    let host = process.env.APP_BASE_URL;
    let shopeeFinalAuthUrl = `${shopeeAuthHost}${shopeeAuthPath}?partner_id=${partnerId}&redirect=${host}/settings/marketplace&timestamp=${ts}&sign=${shopeeSignedString}`;
    let stores = await getListStores();
    return (
        <DefaultLayout>
            {/* <div className="mx-auto max-w-270"> */}
            <Breadcrumb pageName="Settings"/>
            <div className="grid grid-cols-7 gap-2">
                <div
                    className="col-span-2 max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
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
                        <AddMarketplace
                            marinaHost={host}
                            shopeeFinalAuthUrl={shopeeFinalAuthUrl}
                            lazadaChatKey={lazadaChatKeyId}
                            lazadaOmsKey={lazadaOmsKeyId}/>
                        <MarketplaceList
                            channel={channel}
                            isConnected={isConnected}
                            stores={stores}
                            shopeeFinalAuthUrl={shopeeFinalAuthUrl}></MarketplaceList>
                    </CardBody>
                    <Divider/>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default Settings;
