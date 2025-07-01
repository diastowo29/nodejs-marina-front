"use client";
import { createStore } from "@/app/actions/marketplace/actions";
import { BliBliIcon } from "@/app/settings/assets/BliBli";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
// import { ButtonGroup } from "./ButtonGroup";
// import CryptoJS from "crypto-js";

export default function AddMarketplace(props:any) {

  let tiktokAuth = `https://services.tiktokshop.com/open/authorize?service_id=7449020282483050246`
  let lazadaAuth = 'https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true';
  let shopeeAuthPath = '/api/v2/shop/auth_partner';
  let callbackEndpoint = `${props.marinaHost}/settings/marketplace`;
  let ts = Math.floor(Date.now() / 1000);
  
  const partnerId = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_ID;
  // const partnerKey = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_KEY;
  // const shopeeSignString = `${partnerId}${shopeeAuthPath}${ts}`;

  const [marketName, setMarketName] = useState('');
  const [isNew, setNew] = useState(true);
  const [marketUrl, setMarketUrl] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  // const [shopeeSign, setShopeeSign] = useState('');
  const [name, setName] = useState('');

  // let shopeeSign:string = '';
  // let shopeeSignedString = generateHmac(shopeeSignString, partnerKey as string);
  // generateHmac(shopeeSignString, partnerKey as string).then((res) => {
  //   setShopeeSign(res);
  // })
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

    const payload = {
      identifier: marketUrl,
      name:name,
      status:'pending',
      channel: marketplace
    }
    await createStore(payload);
    setLoading(false);
    // console.log(marketUrl);
  }

  return (
    <div className="flex flex-wrap gap-4 items-center">

      {/* make all button SSR to load ENV VARIABLE */}
        {/* <ButtonGroup /> */}
        <Button disabled onClick={() => modalMarketplace('blibli', true)} className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
            Add BliBli Store
        </Button>
        <Button onClick={() => modalMarketplace('tokopedia', true)} className="bg-gradient-to-tr from-lime-600 to-green-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
            Add Tokopedia Store
        </Button>
        <Button className="bg-gradient-to-tr from-orange-500 to-orange-300 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
          <Link href={`${props.shopeeHost}${shopeeAuthPath}?partner_id=${partnerId}&redirect=${process.env.NEXT_PUBLIC_SHOPEE_REDIRECT_URL}settings/marketplace&timestamp=${ts}&sign=${props.shopeeString}`}>
            Add Shopee Store
          </Link>
        </Button>
        <Button className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
            <Link href={`${lazadaAuth}&redirect_uri=${callbackEndpoint}?app=chat&client_id=${props.lazadaChatKey}`}>
            Add Lazada Store (Chat)
            </Link>
        </Button>
        <Button className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
            <Link href={`${lazadaAuth}&redirect_uri=${callbackEndpoint}?app=oms&client_id=${props.lazadaOmsKey}`}>
            Add Lazada Store (Order)
            </Link>
        </Button>
        <Button className="bg-gradient-to-tr from-black to-white text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
          <Link href={tiktokAuth}>
              Add TikTok Store
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
                    <Input
                        isClearable
                        // autoFocus
                        isInvalid={invalidUrl}
                        errorMessage="Please enter a valid URL"
                        label="Enter your Tokopedia marketplace URL"
                        placeholder="https://tokopedia.com/tokoabc"
                        onClear={() => onMarketUrlClear()}
                        value={marketUrl}
                        onChange={(e) => setMarketUrl(e.target.value)} />
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