import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { OrdersTab } from "@/components/Orders/OrdersTabs";
import { Button, Card, CardBody} from "@nextui-org/react";
import Link from "next/link";
import { marinaPageNames, marinaUrls } from "@/config/enum";
import { listChannel } from "../actions/channel/actions";
import { popToast } from "../actions/toast/pop";

export const metadata: Metadata = {
  title: "Orders | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = async () => {
    let channels = await listChannel();
    // console.log(channels);
    console.log(process.env.SOME_KEY);
    if (channels.error || channels.length == 0) {
        // console.log("No channels found or error fetching channels");
        if (channels.error) {
            // popToast('Error fetching channels, contact system administrator', 'error');
        }
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
    // console.log(channels.length)
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
