'use client'
import { createCrm, deleteCrm, handshakeCrm, handshakeSunco } from "@/app/actions/crm/actions";
import { SalesforceIcon, ZendeskIcon } from "@/app/settings/assets/CRM";
import { TokoIcon } from "@/app/settings/assets/Tokopedia";
import { Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Listbox, ListboxItem, ListboxSection, useDisclosure } from "@nextui-org/react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import { useState } from "react";
import { DotsIcon } from "../Icons/dotsaction";
import { popToast } from "@/app/actions/toast/pop";

const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');

export default function AddCrm (props:any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isNew, setNew] = useState(true);
  const [name, setName] = useState('');
  const [apiToken, setapiToken] = useState('');
  const [appId, setappId] = useState('');
  const [appKey, setappKey] = useState('');
  const [appSecret, setappSecret] = useState('');
  const [marketUrl, setMarketUrl] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [resources, setResources] = useState(['chat', 'return']);
  const [isLoading, setLoading] = useState(false);
  const [marketSelectName, setMarketSelectName] = useState('');
  if (props.crm.error) {
    popToast("Could not connect to server, please contact admin", "error");
    return (
      <div className="text-center">
        <p className="text-danger">Could not connect to server, please contact admin</p>
      </div>
    )
  }
  
  const modalMarketplace = (crm:any, newModal:boolean) => {
    setInvalidName(false);
    setInvalidUrl(false);
    if (newModal) {
      setNew(true);
    } else {
      setNew(false);
      setMarketUrl(props.crm.find((c: any) => c.id == crm).baseUrl);
      setappSecret(props.crm.find((c: any) => c.id == crm).credent.find((cr: any) => cr.key == 'SUNCO_APP_SECRET').value);
      setappId(props.crm.find((c: any) => c.id == crm).credent.find((cr: any) => cr.key == 'SUNCO_APP_ID').value);
      setappKey(props.crm.find((c: any) => c.id == crm).credent.find((cr: any) => cr.key == 'SUNCO_APP_KEY').value);
      setapiToken(props.crm.find((c: any) => c.id == crm).credent.find((cr: any) => cr.key == 'ZD_API_TOKEN').value);
    }
    setMarketSelectName(crm);
    onOpen();
  }

  const onMarketUrlClear  = () => {
    if (isNew) {
      setMarketUrl('');
      setInvalidUrl(false);
    }
  }

  const handleDelete = async (id:string) => {
    console.log('delete', id);
    setLoading(true);
    let deletedCrm = await deleteCrm(id);
    console.log(deletedCrm);
    if (deletedCrm.success) {
      popToast("Integration deleted", "success");
      // Refresh the CRM list
      props.crm = props.crm.filter((item:any) => item.id !== id);
    } else {
      popToast("Failed to delete integration", "error");
    }
    setLoading(false);
  }

  const saveCrm = async (crm:string) => {
    setLoading(true);
    setInvalidName(false);
    setInvalidUrl(false);

    console.log(apiToken)

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);    
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

    let handshake = await Promise.all([
        handshakeCrm(marketUrl, apiToken),
        handshakeSunco(appId, encode(`${appKey}:${appSecret}`))
    ]);
    if (handshake[1].error || handshake[0].error) {
        console.log('handshake error');
        console.log(handshake);
        popToast("Connection failed", "error");
    } else {
      if (handshake[0].user.role == 'end-user') {
        console.log('handshake error');
        console.log(handshake);
        popToast("Connection failed - Zendesk Token must be admin token", "error");
      } else {
        let payload = {
            host: marketUrl,
            name: 'ZENDESK',
            suncoAppId: appId,
            suncoAppKey: appKey,
            suncoAppSecret: appSecret,
            apiToken: apiToken,
            resource: resources.toString(),
            crm: crm
        }
        let crmCreate = await createCrm(payload);
        console.log(crmCreate);
        popToast("Integration created!", "success");
      }
    }
    //close modal
    onOpenChange();
    setLoading(false);
  }
    const DescToken = () => {
    return (<Link className="text-sm" isExternal href="https://support.zendesk.com/hc/en-us/articles/4576088682266-Using-the-Conversations-API-keys">Click here to know where to get yours!</Link>)
  }
    return (
        <>
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
                <Button isDisabled onClick={() => modalMarketplace('salesforce', true)} 
                className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" 
                color="primary" variant="flat" 
                size="md" startContent={<SalesforceIcon/>}>
                  Salesforce
                </Button>
              </div>
              <Listbox aria-label="Actions" 
                disabledKeys={["api", "wms"]} selectedKeys={["overview"]} onAction={(key) => modalMarketplace(key, false)} >
                <ListboxSection title="Zendesk" showDivider>
                    {/* loop crm */}
                    {props.crm.map((item:any) => (
                        <ListboxItem startContent={<TokoIcon/>} textValue={item.name} key={item.id}>
                            <div className="flex" style={{alignItems: "center"}}>
                                <div className="flex-1">
                                    <label>{item.name} : </label>
                                    <label className="text-red-500">{item.baseUrl}</label>
                                </div>
                                <div className="flex-row-reverse gap-4 ..." style={{alignItems: "center"}}>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button variant="light" isIconOnly><DotsIcon/></Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem onClick={() => handleDelete(item.id)} key="delete" className="text-danger" color="danger">
                                                Delete
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </ListboxItem>
                    ))}
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
                    isClearable={(isNew)}
                    // autoFocus
                    isInvalid={invalidUrl}
                    errorMessage="Please enter a valid URL"
                    label="Zendesk Domain"
                    placeholder="example.zendesk.com"
                    isDisabled={(isNew) ? false : true}
                    defaultValue={marketUrl}
                    onClear={() => onMarketUrlClear()}
                    // value={marketUrl}
                    onChange={(e) => setMarketUrl(e.target.value)} />
                    <Input
                    isClearable
                    autoFocus
                    label="Zendesk API Token"
                    isInvalid={invalidName}
                    errorMessage="Token cannot be empty"
                    placeholder="eXVsaXVzLmFndW5nQHaxawgRyZWVzc29sdXRpb;lplped25zLmNvbS90b2tlbjp1b3Y2UlpRQU1qc3JaYUhoRVdzYk1TcGVDcUw3WGt3eEpNRXJpWkdm"
                    defaultValue={apiToken}
                    onValueChange={setapiToken} />
                    <Input
                    isClearable={(isNew)}
                    autoFocus
                    label="Sunshine Conversation App ID"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App ID cannot be empty"
                    isDisabled={(isNew) ? false : true}
                    placeholder="5ea6f52b536exafesfcb000f732a35"
                    defaultValue={appId}
                    onValueChange={setappId} />
                    <Input
                    isClearable
                    autoFocus
                    label="Sunshine Conversation App Key"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App Key cannot be empty"
                    placeholder="app_6892d529c1be55bdaf85432e"
                    defaultValue={appKey}
                    onValueChange={setappKey} />
                    <Input
                    isClearable
                    autoFocus
                    label="Sunshine Conversation App Secret"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App Secret cannot be empty"
                    placeholder="Qu1qcAtdXtQJItEUgW9adj30923dlm0T3_QL-yyrdGbA2Lkgwt-xtUXV9q4jkh59VwlJy3w"
                    defaultValue={appSecret}
                    onValueChange={setappSecret} />
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
          </>
    )
}