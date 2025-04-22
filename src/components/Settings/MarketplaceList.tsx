"use client";
import { generateLazToken } from "@/app/actions/marketplace/lazada/action";
import { generateShopeeToken } from "@/app/actions/marketplace/shopee/action";
import { TokoIcon } from "@/app/settings/assets/Tokopedia";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckIcon, DotsIcon } from "../Icons/dotsaction";
import CryptoJS from "crypto-js";
import Link from "next/link";

export default function MarketplaceList(channels:any) {
    // ?code=4857676a6b4b656f6548584d76727154&shop_id=138335
     
    // let lazadaAuth = 'https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true';
    let shopeeAuth = process.env.NEXT_PUBLIC_SHOPEE_HOST || `https://partner.test-stable.shopeemobile.com`;
    let shopeeAuthPath = '/api/v2/shop/auth_partner';
    let ts = Math.floor(Date.now() / 1000);

    const partnerId = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_ID;
    const partnerKey = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_KEY;
    const shopeeSignString = `${partnerId}${shopeeAuthPath}${ts}`;
    let sign = CryptoJS.HmacSHA256(shopeeSignString, (partnerKey) as string).toString(CryptoJS.enc.Hex);

    let [listChannels, setListChannels] = useState(channels.stores)
    let params = useSearchParams();
    let authCode:string = params.get('code') || '';
    let appsNumber:string = params.get('app') || '';
    let shopId:string = params.get('shop_id') || '';
    if (appsNumber && authCode) {
        /* LAZADA */
        generateLazToken(authCode, appsNumber);
    } else if (shopId && authCode) {
        /* SHOPEE */
        generateShopeeToken(authCode, shopId);
    }

    const ReAuthItem = (channel:Record<string, string>) => {
        if (channel.channel == 'shopee') {
            return (
                <Link href={`${shopeeAuth}${shopeeAuthPath}?partner_id=${partnerId}&redirect=${process.env.NEXT_PUBLIC_SHOPEE_REDIRECT_URL}&timestamp=${ts}&sign=${sign}`}>
                    Re-Authorize
                </Link>
            )
        } else {
            return (
                "Re-Authorize"
            )
        }
    }

    return (
        <div>
            <Listbox aria-label="Actions" 
            disabledKeys={["api", "wms"]} 
            selectedKeys={["overview"]} >
                {listChannels.map((channel:Record<string, any>) => (
                    <ListboxSection key={channel.id} title={channel.name} showDivider>
                        {channel.store.map((store:Record<string, string>) => (
                            <ListboxItem startContent={<TokoIcon/>} key={store.id}>
                                <div className="flex" style={{alignItems: "center"}}>
                                    <div className="flex-1">
                                        <label>{store.name}</label>
                                    </div>
                                    <div className="flex-row-reverse gap-4 ..." style={{alignItems: "center"}}>
                                        <Chip color={store.status == 'ACTIVE' ? "success": "danger"} startContent={<CheckIcon size={18} />} variant="faded">
                                            {store.status == 'ACTIVE' ? "Connected": "Disconnected"}
                                        </Chip>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button variant="light" isIconOnly><DotsIcon/></Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem key="new" isDisabled={store.status == 'ACTIVE' ? true: false}>
                                                    <ReAuthItem channel={channel.name}/>
                                                </DropdownItem>
                                                <DropdownItem key="delete" isDisabled={store.status == 'ACTIVE' ? false: true} className="text-danger" color="danger">
                                                    Disconnect
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </ListboxItem>
                        ))}
                    </ListboxSection>
                ))}
            </Listbox>
        </div>
    )
}