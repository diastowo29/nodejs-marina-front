'use client'
import { createCrm, deleteCrm, handshakeCrm, handshakeSunco, updateCrm } from "@/app/actions/crm/actions";
import { SalesforceIcon, ZendeskIcon } from "@/app/settings/assets/CRM";
import { TokoIcon } from "@/app/settings/assets/Tokopedia";
import { Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Listbox, ListboxItem, ListboxSection, Popover, PopoverContent, PopoverTrigger, Skeleton, useDisclosure } from "@nextui-org/react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import { useState } from "react";
import { DotsIcon } from "../Icons/dotsaction";
import { popToast } from "@/app/actions/toast/pop";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Loader2Icon } from "lucide-react"
import { decryptHash } from "@/app/actions/sign/actions";

const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');

export default function AddCrm (props:any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isNew, setNew] = useState(true);
  const [apiToken, setapiToken] = useState('');
  const [appId, setappId] = useState('');
  const [appKey, setappKey] = useState('');
  const [appSecret, setappSecret] = useState('');
  const [marketUrl, setMarketUrl] = useState('');
  const [username, setUsername] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [resources, setResources] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [marketSelectName, setMarketSelectName] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState<string>();
  let defaultSelected:string[] = [];
  
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
      setMarketUrl('');
      setUsername('');
      setappSecret('');
      setappId('');
      setappKey('');
      setapiToken('');
    } else {
      setLoading(true);
      setNew(false);
      const crmIntegration = props.crm.find((c: any) => c.id == crm);
      setId(crm);
      setMarketUrl(crmIntegration.baseUrl);
      Promise.all([
        decryptHash(crmIntegration.credent.find((cr: any) => cr.key == 'ZD_API_TOKEN').value),
        decryptHash(crmIntegration.credent.find((cr: any) => cr.key == 'SUNCO_APP_KEY').value),
        decryptHash(crmIntegration.credent.find((cr: any) => cr.key == 'SUNCO_APP_SECRET').value)
      ]).then((decrypted) => {
        setLoading(false);
        setUsername(atob(decrypted[0]).split('/token:')[0]);
        setapiToken(atob(decrypted[0]).split('/token:')[1]);
        setappKey(decrypted[1]);
        setappSecret(decrypted[2]);
      }).catch(() => {
        setLoading(false);
        popToast('Error reading secret', 'error');
      });
      setappId(crmIntegration.credent.find((cr: any) => cr.key == 'SUNCO_APP_ID').value);
      if (crmIntegration.f_chat) {
        defaultSelected.push('chat');
      }
      if (crmIntegration.f_review) {
        defaultSelected.push('review');
      }
      setResources(defaultSelected)
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

  const updateDelete = async (id: any, isDelete: boolean) => {
    console.log(`id: ${id} is delete ${isDelete}`);
    if (isDelete) {
      setDeleteOpen(true);
    } else {
      popToast('Feature are not ready', "info");
      /* let payload = {
        suncoAppKey: appKey,
        suncoAppSecret: appSecret,
        apiToken: apiToken,
        resource: resources.toString()
      }
      upsertCrm(payload, id).then(() => {
        popToast("Integration created!", "success");
      }).catch((err) => {
        popToast("Integration error!", "error");
      }) */
    }
  }
 
  const confirmDelete = (id: string, e:any) => {
    setLoading(true);
    deleteCrm(id).then((deleted) => {
      setDeleteOpen(false);
      setLoading(false);
      if (deleted.success) {
        popToast("Integration deleted", "success");
      } else {
        popToast("Failed to delete integration", "error");
      }
    })
    e.preventDefault();
  }

  const saveCrm = async (crm:string) => {
    setLoading(true);
    setInvalidName(false);
    setInvalidUrl(false);
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
    
    let payload = {
      host: marketUrl,
      name: 'ZENDESK',
      suncoAppId: appId,
      suncoAppKey: appKey,
      suncoAppSecret: appSecret,
      apiToken: btoa(`${username}/token:${apiToken}`),
      resource: resources.toString(),
      crm: crm
    }
    upsertCrm(payload).then(() => {
      popToast("Integration created!", "success");
      onOpenChange
    }).catch((err) => {
      console.log(err);
      popToast("Integration error!", "error");
    }).finally(() => {
      onOpenChange();
      setLoading(false);
    })

  }

  const DescToken = () => {
    return (<Link className="text-sm text-blue-600/100 dark:text-sky-400/100" isExternal href="https://support.zendesk.com/hc/en-us/articles/4576088682266-Using-the-Conversations-API-keys">Click here to know where to get yours!</Link>)
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
            <Listbox aria-label="Actions" onAction={(key) => modalMarketplace(key, false)} >
              <ListboxSection title="Zendesk" showDivider>
                {props.crm.map((item:any) => (
                    <ListboxItem startContent={(item.name == 'ZENDESK') ? <ZendeskIcon/> : <TokoIcon/>} textValue="" key={item.id}>
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
                                      <DropdownItem onClick={() => setDeleteOpen(true)} key="delete" className="text-danger" color="danger">
                                        Delete
                                      </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                  <AlertDialogTrigger asChild>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        integration and remove your data from our servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Oops, cancel</AlertDialogCancel>
                                        {(isLoading) ? (
                                          <AlertDialogAction disabled>
                                            <Loader2Icon className="animate-spin" />Please wait
                                          </AlertDialogAction>
                                          ) : (
                                          <AlertDialogAction asChild onClick={(e) => confirmDelete(item.id, e)}>
                                            <Button>Yes please</Button>
                                          </AlertDialogAction>
                                        )}
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
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
                  // defaultValue="https://contreesdemo1701844059.zendesk.com"
                  onClear={() => onMarketUrlClear()}
                  // value={marketUrl}
                  onChange={(e) => setMarketUrl(e.target.value)} />
                  {(isLoading) ? (
                    <Skeleton className="h-12 rounded-lg" />
                  ) : (
                    <Input 
                    isClearable={(isNew)}
                    isInvalid={invalidUrl}
                    errorMessage="Please enter a valid email"
                    label="Zendesk Username"
                    placeholder="admin@example.com"
                    defaultValue={username}
                    // defaultValue="yulius.agung@treessolutions.com"
                    onValueChange={setUsername} />
                  )}
                  {(isLoading) ? (
                    <Skeleton className="h-12 rounded-lg" />
                  ) : (
                    <Input
                    isClearable
                    autoFocus
                    label="Zendesk API Token"
                    isInvalid={invalidName}
                    errorMessage="Token cannot be empty"
                    placeholder="gkOumnbWluxmtBUPj3kQkwmzx2jc9bELMf3jKqYGhS"
                    defaultValue={apiToken}
                    // defaultValue="SdAnhp3AQLSz9RAGr3nQz0zMdFy9iM1msW4EWYOL"
                    onValueChange={setapiToken} />
                  )}
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
                  // defaultValue="6570148c052739183fe54940"
                  onValueChange={setappId} />
                   {(isLoading) ? (
                    <Skeleton className="h-12 rounded-lg" />
                  ) : (
                    <Input
                    isClearable
                    autoFocus
                    label="Sunshine Conversation App Key"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App Key cannot be empty"
                    placeholder="app_6892d529c1be55bdaf85432e"
                    defaultValue={appKey}
                    // defaultValue="app_6880586e1794bda2607a4e93"
                    onValueChange={setappKey} />
                  )}
                   {(isLoading) ? (
                    <Skeleton className="h-12 rounded-lg" />
                  ) : (
                    <Input
                    isClearable
                    autoFocus
                    label="Sunshine Conversation App Secret"
                    description={<DescToken/>}
                    isInvalid={invalidToken}
                    errorMessage="App Secret cannot be empty"
                    placeholder="Qu1qcAtdXtQJItEUgW9adj30923dlm0T3_QL-yyrdGbA2Lkgwt-xtUXV9q4jkh59VwlJy3w"
                    defaultValue={appSecret}
                    // defaultValue="MMGjwHG0atYOH1OwebNyh-Fr_hu7pNzecUjJq89pPmHgoNtdpc31csvtTKEmZVuiBZsZyvhgw63AYVOFBCTn9Q"
                    onValueChange={setappSecret} />
                  )}
                  {/* <CheckboxGroup
                    color="secondary"
                    label="Select resource to send"
                    defaultValue={resources}
                    orientation="horizontal"
                    onValueChange={setResources}>
                    <Checkbox value="chat">Chat</Checkbox>
                    <Checkbox value="review">Order Review</Checkbox>
                    <Checkbox value="return">Return Order</Checkbox>
                    <Checkbox value="refund">Refund Order</Checkbox>
                    <Checkbox value="cancel">Order Cancellation</Checkbox>
                  </CheckboxGroup> */}
                </ModalBody>
                {(isNew) ? (
                  <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                          Close
                      </Button>
                      <Button className="bg-sky-600" color="primary" onClick={() => saveCrm(marketSelectName)} isLoading={isLoading}>
                          Submit
                      </Button>
                  </ModalFooter>
                ) : (
                  <ModalFooter>
                      <Button color="danger" variant="light" onClick={() => updateDelete(id, true)} onPress={onClose}>
                          Delete
                      </Button>
                      <Button className="bg-sky-600" color="primary" onClick={() => updateDelete(id, false)} onPress={onClose}>
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

async function upsertCrm (payload:any, id?: string) {
  let handshake = await Promise.all([
      handshakeCrm(payload.host, payload.apiToken),
      handshakeSunco(payload.suncoAppId, encode(`${payload.suncoAppKey}:${payload.suncoAppSecret}`))
  ]);

  if (handshake[1].error || handshake[0].error) {
    throw new Error();
  } else if (handshake[0].user.role == 'end-user') {
    throw new Error();
  } else {
    if (!id) {
      return createCrm(payload);
    } else {
      return updateCrm(payload, id);
    }
  }
}