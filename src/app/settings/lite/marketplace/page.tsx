import {Card, CardHeader, Divider, CardBody} from "@nextui-org/react";
import {getListStores, getListStoresLite} from "@/app/actions/store/actions";
import MarketplaceList from "@/components/Settings/MarketplaceList";
import AddMarketplace from "@/components/Settings/AddMarketplace";
import OrganizationIdPopup from "@/components/Settings/OrganizationIdPopup";
import {generateTiktokToken} from "@/app/actions/marketplace/tiktok/action";
import {generateShopeeToken} from "@/app/actions/marketplace/shopee/action";
import {generateLazToken} from "@/app/actions/marketplace/lazada/action";
import { headers } from 'next/headers';
import { generateDb, generateSchema } from "@/app/actions/auth0/action";

const Settings = async ({searchParams} : {
    searchParams: Promise < {
        [key: string]: string
    } >
}) => {
    let isConnected = false;
    let channel = '';
    let urlParams = await searchParams;
    const headersList = headers();
    let isLoading = false;
    const iframeReferer = headersList.get('referer') || '';
    if (urlParams.code) {
        if (urlParams.app && urlParams.code) {
            /* LAZADA */
            channel = 'Lazada';
            const lazadaParams = {
                code: urlParams.code || '',
                app: urlParams.app || '',
                iframe: false
            };
            let authorized = await generateLazToken(lazadaParams);
            if (!authorized.error) {
                isConnected = true;
            }
        } else if (urlParams.shop_id && urlParams.code) {
            /* SHOPEE */
            channel = 'Shopee';

            let authorized = await generateShopeeToken(urlParams.code, urlParams.shop_id, urlParams.id);
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
    let lazadaChatKeyId = process.env.NEXT_PUBLIC_LAZ_APP_CHAT_KEY_ID;
    let lazadaOmsKeyId = process.env.NEXT_PUBLIC_LAZ_APP_OMS_KEY_ID;
    let host = process.env.APP_BASE_URL;
    let stores = await getListStoresLite(iframeReferer, urlParams.client_id); 
    if (stores.message == 'Client not found') {
        isLoading = true;
        try {
            const hookBody = {
                org_id: 'iframe',
                company_name: urlParams.client_id
            }
            await generateDb(hookBody);
            await generateSchema(hookBody);
            isLoading = false;
        } catch (err) {
            console.log(err);
            isLoading = false;
        }
    }

    return (
        <div className="grid gap-2 p-4">
            <Card className="col-span-5">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">Marketplace Integration</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <p>Integrate your store into Zendesk.</p>
                    <OrganizationIdPopup
                        showLoading={isLoading}
                    />
                    <AddMarketplace
                        clientId={urlParams.client_id || ''}
                        marinaHost={host}
                        lazadaChatKey={lazadaChatKeyId}
                        lazadaOmsKey={lazadaOmsKeyId}/>
                    <MarketplaceList
                        channel={channel}
                        isConnected={isConnected}
                        stores={stores.data}></MarketplaceList>
                </CardBody>
                <Divider/>
            </Card>
        </div>
    );
};

export default Settings;
