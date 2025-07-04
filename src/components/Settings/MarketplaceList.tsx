"use client";
import { TokoIcon } from "@/app/settings/assets/Tokopedia";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { useState } from "react";
import { CheckIcon, DotsIcon } from "../Icons/dotsaction";
import { popToast } from "@/app/actions/toast/pop";
import Link from "next/link";

export default function MarketplaceList(channels:any) {
    let shopeeAuth = process.env.NEXT_PUBLIC_SHOPEE_HOST || `https://partner.test-stable.shopeemobile.com`;
    let shopeeAuthPath = '/api/v2/shop/auth_partner';
    let ts = Math.floor(Date.now() / 1000);
    const partnerId = process.env.NEXT_PUBLIC_SHOPEE_PARTNER_ID;

    if (channels.stores.error) {
        popToast("Could not connect to server, please contact admin", "error");
        return (
            <div className="text-center">
                <p className="text-danger">Could not connect to server, please contact admin</p>
            </div>
        )
    }

    let [listChannels, setListChannels] = useState(channels.stores)
    if (channels.channel) {
        if (!channels.isConnected) {
            popToast(`Connection failed for ${channels.channel}`, "error");
        } else {
            popToast(`Connected to ${channels.channel}`, "success");
        }
    }
    const ReAuthItem = (channel:Record<string, string>) => {
        if (channel.channel == 'shopee') {
            return (
                <Link href={`${shopeeAuth}${shopeeAuthPath}?partner_id=${partnerId}&redirect=${process.env.NEXT_PUBLIC_SHOPEE_REDIRECT_URL}&timestamp=${ts}&sign=${channels.shopeeString}`}>
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