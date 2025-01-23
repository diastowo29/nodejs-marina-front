"use client";
import { BliBliIcon } from "@/app/settings/assets/BliBli";
import { TokoIcon } from "@/app/settings/assets/Tokopedia";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { use, useState } from "react";

export default function MarketplaceList(channels:any) {
    let [listChannels, setListChannels] = useState(channels.stores)
    return (
        <div>
            <Listbox aria-label="Actions" 
            disabledKeys={["api", "wms"]} 
            selectedKeys={["overview"]} >
                {listChannels.map((channel:any) => (
                    <ListboxSection title={channel.name} showDivider>
                        {channel.store.map((store:any) => (
                            <ListboxItem startContent={<TokoIcon/>} key={store.id}>{store.name}</ListboxItem>
                        ))}
                    </ListboxSection>
                ))}
            </Listbox>
        </div>
    )
}