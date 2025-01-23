"use client";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import Link from "next/link";

export default function SidebarSetting ({selected}:{selected:string}) {
    return (
        <Listbox aria-label="Actions" selectedKeys={[selected]}>
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
    )
}