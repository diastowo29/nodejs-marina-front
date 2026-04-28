"use client";
import { upsertCrm } from "@/app/actions/crm/actions";
import { generateTiktokToken } from "@/app/actions/marketplace/tiktok/action";
import { generateShopeeAuthUrl } from "@/app/actions/sign/actions";
import { popToast } from "@/app/actions/toast/pop";
import { BliBliIcon } from "@/app/settings/assets/BliBli";
import { marinaChannel } from "@/config/enum";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

declare const ZAFClient: any;

export default function AddMarketplace(props:any) {
    const router = useRouter();
    // let tiktokAuth = `https://services.tiktokshop.com/open/authorize?service_id=7449020282483050246`
    let tiktokAuth = 'https://services.tiktokshop.com/open/authorize?service_id=7523274804246841144'
    let lazadaAuth = 'https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true';
    let callbackEndpoint = `${props.marinaHost}/settings/marketplace`;
    
    const [marketName, setMarketName] = useState('');
    const [shpePartnerId, setShpePartnerId] = useState('');
    const [shpePartnerKey, setShpePartnerKey] = useState('');
    const [isNew, setNew] = useState(true);
    const [marketUrl, setMarketUrl] = useState('');
    const [invalidUrl, setInvalidUrl] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isLoadingZendesk, setIsLoadingZendesk] = useState(false);
    const [isIframe, setIsIframe] = useState(window.self !== window.top);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState('');
    const modalMarketplace = (btn:any, newModal:boolean) => {
        if (newModal) {
            setNew(true);
        } else {
            setNew(false);
        }
        setMarketName(btn);
        onOpen();
    }
    const onMarketUrlClear  = () => {
        setMarketUrl('');
        setInvalidUrl(false);
    }

    const tiktokClicked = () => {
        const tiktokWindow = window.open(tiktokAuth, '_blank');
        const timer = setInterval(async () => {
            try {
                if (tiktokWindow?.closed) {
                    clearInterval(timer);
                }
                const host = tiktokWindow?.location.host || '';
                if (tiktokWindow?.location.host === host) {
                    const windowUrl = new URL(tiktokWindow.location.href);
                    let channel = '';
                    let authResponse = {};
                    if (windowUrl.searchParams.has('app_key') && windowUrl.searchParams.has('code')) {
                        channel = marinaChannel.Tiktok;
                        const code = windowUrl.searchParams.get('code');
                        if (code) {
                            authResponse = await generateTiktokToken(code, isIframe, props.clientId);
                        }
                    } else {
                        popToast('Invalid response from TikTok authentication', 'error');
                        tiktokWindow.close();
                        clearInterval(timer);
                        return;
                    }
                    if ((authResponse as any).error) {
                        console.log(authResponse)
                        popToast(`Connection failed for ${channel}`, "error");
                    } else {
                        popToast(`Connected to ${channel}`, "success");
                    }
                    tiktokWindow.close();
                    clearInterval(timer);
                } else {
                    console.log(tiktokWindow?.location);
                }
            } catch (e) {
                if (e instanceof DOMException && e.name === "SecurityError") {
                    console.log('Navigated to a different domain, cannot access location');
                } else {
                    console.log(e);
                    clearInterval(timer);
                }
            }
        }, 1000);
    }

    const saveModalMarketplace = async (marketplace:string) => {
        setLoading(true);
        let isValid = true;
        if (!isValid) {
            setInvalidUrl(true);
            return;
        }
        // setMarketUrl(`${shpePartnerId}:${shpePartnerKey}`);
        const payload = {
            identifier: marketUrl || `${shpePartnerId}:${shpePartnerKey}`,
            name:name,
            status:'pending',
            channel: marketplace
        }
        generateShopeeAuthUrl(payload).then((result) => {
            setLoading(false);
            router.push(result);
        })
    }

    const shopeeClick = (e:any) => {
        setLoading(true);
        e.preventDefault();
        generateShopeeAuthUrl({}).then((result) => {
            setLoading(false);
            router.push(result);
        })
    }

    const loadZendeskClient = async () => {
        setIsLoadingZendesk(true);
        try {
            const zdClient = ZAFClient.init();
            const zdMetadata = await zdClient.metadata();
            const reqList = {
                marina_user_origin_id: 'requirement:marina_user_origin_id',
                marina_message_id: 'requirement:marina_message_id',
                marina_store_id: 'requirement:marina_store_id',
                marina_channel: 'requirement:marina_channel',
                marina_store: 'requirement:marina_store'
            }
            if (isIframe) {
                const marinaUserOriginId = await zdClient.get(reqList.marina_user_origin_id);
                const marinaMessageId = await zdClient.get(reqList.marina_message_id);
                const marinaStoreId = await zdClient.get(reqList.marina_store_id);
                const marinaChannel = await zdClient.get(reqList.marina_channel);
                const marinaStore = await zdClient.get(reqList.marina_store);
                const crmPayload = {
                    host: window.location.ancestorOrigins[0],
                    name: 'ZENDESK',
                    suncoAppId: zdMetadata.settings.sunco_app_id,
                    suncoAppKey: zdMetadata.settings.sunco_app_key,
                    suncoAppSecret: zdMetadata.settings.sunco_app_secret,
                    apiToken: 'iframe_token',
                    resource: ['chat'],
                    notes: `${marinaUserOriginId[reqList.marina_user_origin_id].requirement_id}-${marinaMessageId[reqList.marina_message_id].requirement_id}-${marinaStoreId[reqList.marina_store_id].requirement_id}-${marinaChannel[reqList.marina_channel].requirement_id}-${marinaStore[reqList.marina_store].requirement_id}`
                }
                await upsertCrm(crmPayload, isIframe, zdMetadata.settings.client_id);
            }
            zdClient.invoke("notify", "Marina successfully loaded!!");
        } catch (err) {
            console.error("Error loading Zendesk client:", err);
            popToast('Failed to load Zendesk client', "error");
        } finally {
            setIsLoadingZendesk(false);
        }
    }
    return (
        <div className="flex flex-wrap gap-4 items-center">
            {isIframe && (
                <Script src="https://static.zdassets.com/zendesk_app_framework_sdk/2.0/zaf_sdk.min.js" onLoad={loadZendeskClient}/>
            )}
            <Button isDisabled onClick={() => modalMarketplace('blibli', true)} className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add BliBli Store
            </Button>
            <Button onClick={tiktokClicked} className="bg-gradient-to-tr from-lime-500 to-black text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add Tokopedia/TikTok Store
            </Button>
            <Button onClick={() => modalMarketplace('shopee', true)} className="bg-gradient-to-tr from-orange-500 to-orange-300 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add Shopee Store (Chat)
            </Button>
            <Button isDisabled={isLoading} onClick={(e) => shopeeClick(e)} className="bg-gradient-to-tr from-orange-500 to-orange-300 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add Shopee Store
            </Button>
            <Button isDisabled className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                <Link href={`${lazadaAuth}&redirect_uri=${callbackEndpoint}?app=chat&client_id=${props.lazadaChatKey}`}>
                Add Lazada Store (Chat)
                </Link>
            </Button>
            <Button isDisabled className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                <Link href={`${lazadaAuth}&redirect_uri=https://marina-apps-553781175495.asia-southeast2.run.app/settings/marketplace?app=oms&client_id=${props.lazadaOmsKey}`}>
                Add Lazada Store (Order)
                </Link>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    {(isNew) ? (
                        <ModalHeader className="flex flex-col gap-1">Add new Marketplace</ModalHeader>
                    ) : (
                        <ModalHeader className="flex flex-col gap-1">Update Marketplace</ModalHeader>
                    )}
                    <ModalBody>
                        <Input
                        isClearable
                        autoFocus
                        label="Store name"
                        placeholder="ABC Store"
                        onValueChange={setName} />
                        {(marketName == 'shopee') && (
                            <>
                            <Input
                            isClearable
                            isInvalid={invalidUrl}
                            errorMessage="Please enter a valid Shopee live partner ID"
                            label={`Shopee Live Partner ID`}
                            placeholder="123456"
                            onClear={() => onMarketUrlClear()}
                            value={shpePartnerId}
                            onChange={(e) => setShpePartnerId(e.target.value)} />
                            <Input
                            isClearable
                            isInvalid={invalidUrl}
                            errorMessage="Please enter a valid Shopee live partner key"
                            label={`Shopee Live Partner Key`}
                            placeholder="123456:xxabcde123s"
                            onClear={() => onMarketUrlClear()}
                            value={shpePartnerKey}
                            onChange={(e) => setShpePartnerKey(e.target.value)} />
                            </>
                        )}
                        {(marketName == 'tokopedia') && (
                            <Input
                                isClearable
                                isInvalid={invalidUrl}
                                errorMessage="Please enter a valid URL"
                                label={`Enter your ${marketName} marketplace details`}
                                onClear={() => onMarketUrlClear()}
                                value={marketUrl}
                                onChange={(e) => setMarketUrl(e.target.value)} />
                        )}
                    </ModalBody>
                    {(isNew) ? (
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onClick={() => saveModalMarketplace(marketName)} isLoading={isLoading}>
                                Submit
                            </Button>
                        </ModalFooter>
                    ) : (
                        
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Delete
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Save
                            </Button>
                        </ModalFooter>
                    )}
                    </>
                )}
                </ModalContent>
            </Modal>
            {isLoadingZendesk && (
                <Modal isOpen={isLoadingZendesk} backdrop="blur" onOpenChange={() => {}}>
                    <ModalContent>
                        <ModalBody className="flex justify-center items-center py-8">
                            <Spinner size="lg" />
                            <p className="ml-4">Loading Zendesk client...</p>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}