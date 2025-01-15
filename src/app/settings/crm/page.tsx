"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Listbox, ListboxItem, ListboxSection, Card, CardHeader, Divider, CardBody, CardFooter, Link, Button } from "@nextui-org/react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { TokoIcon } from "../assets/Tokopedia";
import { useState } from "react";
import { SalesforceIcon, ZendeskIcon } from "../assets/CRM";

// export const metadata: Metadata = {
//   title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const Settings = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isNew, setNew] = useState(true);
  const [name, setName] = useState('');
  const [marketUrl, setMarketUrl] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [marketSelectName, setMarketSelectName] = useState('');
  let channelClicked:string;

  const modalMarketplace = (btn:any, newModal:boolean) => {
    setInvalidName(false);
    setInvalidUrl(false);
    if (newModal) {
        setNew(true);
    } else {
        setNew(false);
    }
    setMarketSelectName(btn);
    onOpen();
  }

  const onMarketUrlClear  = () => {
    setMarketUrl('');
    setInvalidUrl(false);
  }

  const saveMarketplace = async (marketplace:string) => {
    setLoading(true);
    setInvalidName(false);
    setInvalidUrl(false);

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);
    let isNameValid = (name === '') ? false : true;
    
    let isUrlValid = false;
    if (marketUrl != '') {
        if (marketUrl.match(regex)) {
            isUrlValid = true;
        } else {
            isUrlValid = false;
        }
    } else {
        isUrlValid = false;
    }

    if (!isNameValid || !isUrlValid) {
        if (!isNameValid) {
            setInvalidName(true);
        }
        if (!isUrlValid) {
            setInvalidUrl(true);
        }
        setLoading(false);
        return;
    }

    const payload = {
      identifier: marketUrl,
      name:name,
      status:'pending',
      channel: marketplace
    }
    // await createStore(payload);
    setLoading(false);
    setName('');
    setMarketUrl('');
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
              <p>Connect your CRM to Marina.</p>
              <div className="flex flex-wrap gap-4 items-center">
                <Button onClick={() => modalMarketplace('zendesk', true)} 
                className="bg-gradient-to-tr from-emerald-950 to-green-900 text-white shadow-lg" 
                color="primary" variant="flat" 
                size="md" startContent={<ZendeskIcon/>}>
                  Connect Zendesk
                </Button>
                <Button disabled onClick={() => modalMarketplace('salesforce', true)} 
                className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" 
                color="primary" variant="flat" 
                size="md" startContent={<SalesforceIcon/>}>
                  Connect Salesforce
                </Button>
              </div>
              <Listbox aria-label="Actions" 
                disabledKeys={["api", "wms"]} selectedKeys={["overview"]} onAction={(key) => modalMarketplace(key, false)} >
                <ListboxSection title="Zendesk" showDivider>
                  <ListboxItem startContent={<TokoIcon/>} key="overview">pdi-rokitvhelp.zendesk.com</ListboxItem>
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
                    <ModalHeader className="flex flex-col gap-1">Connect a CRM</ModalHeader>
                  ) : (
                    <ModalHeader className="flex flex-col gap-1">Update Integration</ModalHeader>
                  )}
                  <ModalBody>
                    <Input
                    isClearable
                    autoFocus
                    label="CRM Name"
                    isInvalid={invalidName}
                    errorMessage="Name cannot be empty"
                    placeholder="Zendesk PDI"
                    onValueChange={setName} />
                    <Input
                    isClearable
                    autoFocus
                    label="API Token"
                    isInvalid={invalidToken}
                    errorMessage="Token cannot be empty"
                    placeholder="jfoerufISDS983d293dhzx"
                    onValueChange={setName} />
                    <Input
                        isClearable
                        // autoFocus
                        isInvalid={invalidUrl}
                        errorMessage="Please enter a valid URL"
                        label="Zendesk Domain"
                        placeholder="example.zendesk.com"
                        onClear={() => onMarketUrlClear()}
                        value={marketUrl}
                        onChange={(e) => setMarketUrl(e.target.value)} />
                  </ModalBody>
                  {(isNew) ? (
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={() => saveMarketplace(marketSelectName)} isLoading={isLoading} /* onPressStart={() => submitReject(reason, orderId)} */>
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
