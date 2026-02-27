"use client";
import { createStore } from "@/app/actions/marketplace/actions";
import { generateShopeeAuthUrl } from "@/app/actions/sign/actions";
// import { generateHmac } from "@/app/actions/sign/actions";
import { BliBliIcon } from "@/app/settings/assets/BliBli";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

    const saveMarketplace = async (marketplace:string) => {
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

    return (
        <div className="flex flex-wrap gap-4 items-center">
            <Button isDisabled onClick={() => modalMarketplace('blibli', true)} className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add BliBli Store
            </Button>
            <Button isDisabled onClick={() => modalMarketplace('tokopedia', true)} className="bg-gradient-to-tr from-lime-600 to-green-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add Tokopedia Store
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
            <Button className="bg-gradient-to-tr from-black to-white text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
            <Link href={tiktokAuth}>
                Add Tokopedia/TikTok Shop Store
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
                            <Button color="primary" onClick={() => saveMarketplace(marketName)} isLoading={isLoading}>
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
        </div>
    )
}