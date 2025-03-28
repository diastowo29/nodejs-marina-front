import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { INT_LIST_CHANNEL, INT_ORDER_BYCHANNEL } from "@/urls/internal";
import { OrdersTab } from "@/components/Orders/OrdersTabs";
import { Button, Card, CardBody} from "@nextui-org/react";
import Link from "next/link";
import { marinaPageNames, marinaUrls } from "@/config/enum";

export const metadata: Metadata = {
  title: "Orders | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = async () => {
    let channelsRaw = await fetch(INT_LIST_CHANNEL);
    let channels = await channelsRaw.json();
    if (channels.length == 0) {
        return (
          <DefaultLayout>
            <Breadcrumb pageName={marinaPageNames.Orders} />
            <Card>
                <CardBody>
                    <p>Please connect your marketplace to access this page</p>
                    <Button style={{"width": "fit-content"}} size="md">
                        <Link href={marinaUrls.setting_marketplace}>
                        Connect now
                        </Link>
                    </Button>
                </CardBody>
            </Card>
          </DefaultLayout>  
        );
    }
    // let firstOrderRaw = await fetch(INT_ORDER_BYCHANNEL(channels[0].name));
    // let firstOrder = await firstOrderRaw.json();
    let firstOrder:any[] = [];
    return (
        <DefaultLayout>
            <Breadcrumb pageName={marinaPageNames.Orders} />
            <OrdersTab tabsData={channels} initTableData={firstOrder}></OrdersTab>
        </DefaultLayout>
    );
};

export default TablesPage;
