"use client";
import { generateLazToken } from "@/app/actions/marketplace/lazada/action";
import { generateShopeeToken } from "@/app/actions/marketplace/shopee/action";
import { TokoIcon } from "@/app/settings/assets/Tokopedia";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MarketplaceList(channels:any) {
    // ?code=4857676a6b4b656f6548584d76727154&shop_id=138335

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
    return (
        <div>
            <Listbox aria-label="Actions" 
            disabledKeys={["api", "wms"]} 
            selectedKeys={["overview"]} >
                {listChannels.map((channel:any) => (
                    <ListboxSection key={channel.id} title={channel.name} showDivider>
                        {channel.store.map((store:any) => (
                            <ListboxItem startContent={<TokoIcon/>} key={store.id}>{store.name}</ListboxItem>
                        ))}
                    </ListboxSection>
                ))}
            </Listbox>
        </div>
    )
}