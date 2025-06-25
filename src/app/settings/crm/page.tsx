"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import Image from "next/image";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Listbox, ListboxItem, ListboxSection, Card, CardHeader, Divider, CardBody, CardFooter, Link, Button, CheckboxGroup, Checkbox } from "@nextui-org/react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { TokoIcon } from "../assets/Tokopedia";
import { useState } from "react";
import { SalesforceIcon, ZendeskIcon } from "../assets/CRM";
import { createCrm, handshakeCrm, handshakeSunco } from "@/app/actions/crm/actions";
// import { useUser } from "@auth0/nextjs-auth0/client";

// export const metadata: Metadata = {
//   title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };
const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');

const Settings = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isNew, setNew] = useState(true);
  const [name, setName] = useState('pdi rokitv');
  const [apiToken, setapiToken] = useState('eXVsaXVzLmFndW5nQHRyZWVzc29sdXRpb25zLmNvbS90b2tlbjp1b3Y2UlpRQU1qc3JaYUhoRVdzYk1TcGVDcUw3WGt3eEpNRXJpWkdm');
  const [appId, setappId] = useState('5ea6f52b536ecb000f732a35');
  const [appKey, setappKey] = useState('app_5f2cd3cf63af24000cc0c6c6');
  const [appSecret, setappSecret] = useState('k6Heeb4NkXac1D9Br6OcopZ4IrgSFLPAXFjRXWY8p-wuyq0Y6CLn0lZW4f_aCCb4TWbCBC-4_9WyCIasha75OA');
  const [marketUrl, setMarketUrl] = useState('https://pdi-rokitvhelp.zendesk.com');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [resources, setResources] = useState(['chat', 'return']);
  const [isLoading, setLoading] = useState(false);
  const [marketSelectName, setMarketSelectName] = useState('');

  // const { user } = useUser();
  // console.log(user);
  // let channelClicked:string;

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

  const saveCrm = async (crm:string) => {
    setLoading(true);
    setInvalidName(false);
    setInvalidUrl(false);

    console.log(apiToken)

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

    // if (!isNameValid || !isUrlValid) {
    //     if (!isNameValid) {
    //         setInvalidName(true);
    //     }
    //     if (!isUrlValid) {
    //         setInvalidUrl(true);
    //     }
    //     console.log('invalid')
    //     setLoading(false);
    //     return;
    // }

    setLoading(false);
    // setName('');
    // setMarketUrl('');
    // console.log(payload);
    // console.log(marketUrl);
    let handshake = await Promise.all([
      handshakeCrm(marketUrl, apiToken),
      handshakeSunco(appId, encode(`${appKey}:${appSecret}`))
    ]);
    // console.log(handshake);
    if (handshake[0].user.role == 'end-user' || handshake[1].errors) {
      console.log('handshake error');
    } else {
      let payload = {
        host: marketUrl,
        name: name,
        suncoAppId: appId,
        suncoAppKey: appKey,
        suncoAppSecret: appSecret,
        apiToken: apiToken,
        resource: resources.toString(),
        crm: crm
      }
      // console.log(payload)
      let crmCreate = await createCrm(payload);
      console.log(crmCreate);
    }
  }

  const DescToken = () => {
    return (<Link className="text-sm" isExternal href="https://support.zendesk.com/hc/en-us/articles/4576088682266-Using-the-Conversations-API-keys">Click here to know where to get yours!</Link>)
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
                <ListboxItem textValue="Overview" key="overview">Overview</ListboxItem>
              </ListboxSection>
              <ListboxSection title="Accounts" showDivider>
                <ListboxItem textValue="Billing" key="billing">Billing</ListboxItem>
              </ListboxSection>
              <ListboxSection title="Accounts" showDivider>
                <ListboxItem textValue="Store Connection" key="store"><Link href="/settings/marketplace">Store Connection</Link></ListboxItem>
                <ListboxItem textValue="CRM Integration" key="crm"><Link href="/settings/crm">CRM Integration</Link></ListboxItem>
                <ListboxItem textValue="Marina WMS (Soon)" key="wms">Marina WMS (Soon)</ListboxItem>
                <ListboxItem textValue="Marina API (Soon)" key="api">Marina API (Soon)</ListboxItem>
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
                  Zendesk
                </Button>
                <Button disabled onClick={() => modalMarketplace('salesforce', true)} 
                className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" 
                color="primary" variant="flat" 
                size="md" startContent={<SalesforceIcon/>}>
                  Salesforce
                </Button>
              </div>
              <Listbox aria-label="Actions" 
                disabledKeys={["api", "wms"]} selectedKeys={["overview"]} onAction={(key) => modalMarketplace(key, false)} >
                <ListboxSection title="Zendesk" showDivider>
                  <ListboxItem startContent={<TokoIcon/>} textValue="pdi-rokitvhelp.zendesk.com" key="overview">pdi-rokitvhelp.zendesk.com</ListboxItem>
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
                    label="Name your CRM Integration"
                    isInvalid={invalidName}
                    errorMessage="Name cannot be empty"
                    placeholder="Zendesk PDI"
                    defaultValue="pdi rokitv"
                    onValueChange={setName} />
                    <Input
                    isClearable
                    autoFocus
                    label="Zendesk API Token"
                    isInvalid={invalidName}
                    errorMessage="Token cannot be empty"
                    placeholder="eXVsaXVzLmFndW5nQHaxawgRyZWVzc29sdXRpb;lplped25zLmNvbS90b2tlbjp1b3Y2UlpRQU1qc3JaYUhoRVdzYk1TcGVDcUw3WGt3eEpNRXJpWkdm"
                    defaultValue="eXVsaXVzLmFndW5nQHRyZWVzc29sdXRpb25zLmNvbS90b2tlbjp1b3Y2UlpRQU1qc3JaYUhoRVdzYk1TcGVDcUw3WGt3eEpNRXJpWkdm"
                    onValueChange={setapiToken} />
                    <Input
                    isClearable
                    autoFocus
                    label="Sunshine Conversation App ID"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App ID cannot be empty"
                    placeholder="5ea6f52b536exafesfcb000f732a35"
                    defaultValue="5ea6f52b536ecb000f732a35"
                    onValueChange={setappId} />
                    <Input
                    isClearable
                    autoFocus
                    label="Sunshine Conversation App Key"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App Key cannot be empty"
                    placeholder="app_5f2cd3cf63af24000ccuhude60c6c6"
                    defaultValue="app_5f2cd3cf63af24000cc0c6c6"
                    onValueChange={setappKey} />
                    <Input
                    isClearable
                    autoFocus
                    label="Sunshine Conversation App Secret"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App Secret cannot be empty"
                    placeholder="k6Heeb4NkXac1D9kmkd83092fswosdBBr6OcopZ4IrgSFLPAXFjRXWY8p-wuyq0Y6CLn0lZW4f_aCCb4TWbCBC-4_9WyCIasha75OA"
                    defaultValue="k6Heeb4NkXac1D9Br6OcopZ4IrgSFLPAXFjRXWY8p-wuyq0Y6CLn0lZW4f_aCCb4TWbCBC-4_9WyCIasha75OA"
                    onValueChange={setappSecret} />
                    <Input
                        isClearable
                        // autoFocus
                        isInvalid={invalidUrl}
                        errorMessage="Please enter a valid URL"
                        label="Zendesk Domain"
                        placeholder="example.zendesk.com"
                        defaultValue="https://pdi-rokitvhelp.zendesk.com"
                        onClear={() => onMarketUrlClear()}
                        // value={marketUrl}
                        onChange={(e) => setMarketUrl(e.target.value)} />
                        <CheckboxGroup
                          color="secondary"
                          defaultValue={["chat", "return"]}
                          label="Select resource to send"
                          orientation="horizontal"
                          onValueChange={setResources}>
                          <Checkbox value="chat">Chat</Checkbox>
                          <Checkbox value="review">Order Review</Checkbox>
                          <Checkbox value="return">Return Order</Checkbox>
                          <Checkbox value="refund">Refund Order</Checkbox>
                          <Checkbox value="cancel">Order Cancellation</Checkbox>
                        </CheckboxGroup>
                  </ModalBody>
                  {(isNew) ? (
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={() => saveCrm(marketSelectName)} isLoading={isLoading} /* onPressStart={() => submitReject(reason, orderId)} */>
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
