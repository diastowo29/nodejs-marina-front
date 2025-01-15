"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Listbox, ListboxItem, ListboxSection, Card, CardHeader, Divider, CardBody, CardFooter, Link, Button } from "@nextui-org/react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { BliBliIcon } from "../assets/BliBli";
import { TokoIcon } from "../assets/Tokopedia";
import { useState } from "react";
import { createStore } from "@/app/actions/marketplace/actions";
// import { store } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { generateToken } from "@/app/actions/marketplace/lazada/action";

// export const metadata: Metadata = {
//   title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const Settings = () => {
  let params = useSearchParams();
  let authCode = params.get('code');
  console.log(params.get('code'));
  if (authCode) {
    let isSuccess = generateToken(authCode);
    console.log(isSuccess)
  }
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
  }

  return (
    <DefaultLayout>
      {/* <div className="mx-auto max-w-270"> */}
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-2 max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Listbox aria-label="Actions" 
              disabledKeys={["api", "wms"]} selectedKeys={["overview"]} onAction={(key) => alert(key)} >
              <ListboxSection title="Home" showDivider>
                <ListboxItem key="overview">Overview</ListboxItem>
              </ListboxSection>
              <ListboxSection title="Accounts" showDivider>
                <ListboxItem key="billing">Billing</ListboxItem>
              </ListboxSection>
              <ListboxSection title="Accounts" showDivider>
                <ListboxItem key="store"><Link href="/settings/marketplace">Store Connection</Link></ListboxItem>
                <ListboxItem key="crm"><Link href="/settings/crm">CRM Integration</Link></ListboxItem>
                <ListboxItem key="wms">Marina WMS (Soon)</ListboxItem>
                <ListboxItem key="api">Marina API (Soon)</ListboxItem>
              </ListboxSection>
            </Listbox>
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
              <div className="flex flex-wrap gap-4 items-center">
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
                  <Link href="https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://2391-122-129-96-106.ngrok-free.app/settings/marketplace/callback&client_id=131557">
                    Add Lazada Store (Chat)
                  </Link>
                </Button>
                <Button disabled className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  <Link href="https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://2391-122-129-96-106.ngrok-free.app/settings/marketplace/callback&client_id=131557">
                    Add Lazada Store (Order)
                  </Link>
                </Button>
                <Button disabled className="bg-gradient-to-tr from-black to-white text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                  Add TikTok Store
                </Button>
              </div>
              <Listbox aria-label="Actions" 
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
              </Listbox>
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
                        <Button color="primary" onClick={() => saveMarketplace(marketName)} isLoading={isLoading} /* onPressStart={() => submitReject(reason, orderId)} */>
                            Submit
                        </Button>
                    </ModalFooter>
                  ) : (
                    
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Delete
                        </Button>
                        <Button color="primary" /* onPressStart={() => submitReject(reason, orderId)} */ onPress={onClose}>
                            Save
                        </Button>
                    </ModalFooter>
                  )}
                  </>
              )}
              </ModalContent>
          </Modal>
        </div>
    </DefaultLayout>
  );
};

export default Settings;
