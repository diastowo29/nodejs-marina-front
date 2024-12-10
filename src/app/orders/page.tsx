import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { INT_LIST_CHANNEL, INT_ORDER_BYCHANNEL } from "@/urls/internal";
import { OrdersTab } from "@/components/Orders/OrdersTabs";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";

export const metadata: Metadata = {
  title: "Orders | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = async () => {
    // let { user } = await getSession();
    // console.log(user);

    // let {accessToken} = await getAccessToken();
    // console.log(accessToken);
    let channelsRaw = await fetch(INT_LIST_CHANNEL);
    let channels = await channelsRaw.json();
    console.log(channels);
    let firstOrderRaw = await fetch(INT_ORDER_BYCHANNEL(channels[0].name));
    let firstOrder = await firstOrderRaw.json();
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Orders" />
            {/* <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Listbox aria-label="Actions">
                <ListboxItem key="new">New file</ListboxItem>
                <ListboxItem key="copy">Copy link</ListboxItem>
                <ListboxItem key="edit">Edit file</ListboxItem>
                <ListboxItem key="delete" className="text-danger" color="danger">Delete file</ListboxItem>
            </Listbox>
            </div> */}
            <OrdersTab tabsData={channels} initTableData={firstOrder}></OrdersTab>
        </DefaultLayout>
    );
};

export default TablesPage;
