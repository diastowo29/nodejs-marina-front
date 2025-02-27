// "use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Listbox, ListboxItem, ListboxSection, Card, CardHeader, Divider, CardBody, CardFooter, Link, Button } from "@nextui-org/react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { BliBliIcon } from "../assets/BliBli";
import { TokoIcon } from "../assets/Tokopedia";
// import React, { useState } from "react";
import { createStore } from "@/app/actions/marketplace/actions";
// import { store } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { generateToken } from "@/app/actions/marketplace/lazada/action";
import { getListStores } from "@/app/actions/store/actions";
import MarketplaceList from "@/components/Settings/MarketplaceList";
import { Suspense } from "react";
import { initScriptLoader } from "next/script";
import SidebarSetting from "@/components/Settings/SidebarSettings";
import AddMarketplace from "@/components/Settings/AddMarketplace";

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
  /* let params = useSearchParams();
  let authCode:any = params.get('code');
  let appsNumber:any = params.get('app');
  if (authCode) {
    let isSuccess = generateToken(authCode, appsNumber);
    console.log(isSuccess);
  } */

  let stores = await getListStores();

  // if (stores.error) {
  //   console.log('error');
  // }
  // console.log(stores);
  // if (stores) {
  //   console.log(stores);
  // }
  /* const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isNew, setNew] = useState(true);
  const [name, setName] = useState('');
  const [marketUrl, setMarketUrl] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [marketName, setMarketName] = useState('');
  let channelClicked:string;

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
    console.log(marketUrl);
  } */

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
              <AddMarketplace/>
              {/* <div className="flex flex-wrap gap-4 items-center">
                <Button disabled onClick={() => modalMarketplace('blibli', true)} className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  Add BliBli Store
                </Button>
                <Button onClick={() => modalMarketplace('tokopedia', true)} className="bg-gradient-to-tr from-lime-600 to-green-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  Add Tokopedia Store
                </Button>
                <Button disabled className="bg-gradient-to-tr from-orange-500 to-orange-300 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  Add Shopee Store
                </Button>
                <Button disabled className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  <Link href={`${lazadaAuth}&redirect_uri=${callbackEndpoint}?app=chat&client_id=${process.env.NEXT_PUBLIC_LAZ_APP_CHAT_KEY_ID}`}>
                    Add Lazada Store (Chat)
                  </Link>
                </Button>
                <Button disabled className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  <Link href={`${lazadaAuth}&redirect_uri=${callbackEndpoint}?app=oms&client_id=${process.env.NEXT_PUBLIC_LAZ_APP_OMS_KEY_ID}`}>
                    Add Lazada Store (Order)
                  </Link>
                </Button>
                <Button disabled className="bg-gradient-to-tr from-black to-white text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  Add TikTok Store
                </Button>
              </div> */}
              {/* <Suspense fallback={<div>Loading...</div>}> */}
                <MarketplaceList stores={stores}></MarketplaceList>
              {/* </Suspense> */}
              {/* <MarketplaceList></MarketplaceList> */}
              {/* <Listbox aria-label="Actions" 
                disabledKeys={["api", "wms"]} selectedKeys={["overview"]} onAction={(key) => modalMarketplace(key, false)} >
                <ListboxSection title="Tokopedia" showDivider>
                  <ListboxItem startContent={<TokoIcon/>} key="overview">Toko Kelontong</ListboxItem>
                </ListboxSection>
                <ListboxSection title="Shopee" showDivider>
                  <ListboxItem key="kelontongshop">Kelontong Shop</ListboxItem>
                  <ListboxItem key="kelontongcenter">Kelontong Center Pusat</ListboxItem>
                </ListboxSection>
                <ListboxSection title="BliBli" showDivider>
                  <ListboxItem startContent={<BliBliIcon/>} key="store">Kelontong Ceria</ListboxItem>
                </ListboxSection>
              </Listbox> */}
            </CardBody>
            <Divider/>
            {/* <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui">
                Visit source code on GitHub.
              </Link>
            </CardFooter> */}
          </Card>
          {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
          </Modal> */}
        </div>
    </DefaultLayout>
  );
};

export default Settings;
