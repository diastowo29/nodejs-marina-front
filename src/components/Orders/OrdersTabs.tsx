
'use client';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { OrdersStatusTabs } from "./OrdersStatusTabs";
import { getOrdersCnl } from "@/app/actions/order/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { marinaChannel } from "@/config/enum";
// import { useRouter } from "next/router";

export const OrdersTab = (tabsData : any) => {
    const searchParams = useSearchParams();
    const router  = useRouter();
    const pathname = usePathname();

    const [channelTab, setChannelTab] : any = useState(searchParams.get('c') || null);
    const [tableData, setTableData] = useState(tabsData.initTableData);
    const [loading, setLoading] = useState(false);
    // console.log(tabsData);

    const channels = [
        { id: marinaChannel.Tokopedia.toLowerCase(), name: marinaChannel.Tokopedia}, 
        { id: marinaChannel.Shopee.toLowerCase(), name: marinaChannel.Shopee}, 
        { id: marinaChannel.Tiktok.toLowerCase(), name: marinaChannel.Tiktok}, 
        { id: marinaChannel.BliBli.toLowerCase(), name: marinaChannel.BliBli}, 
        { id: marinaChannel.Lazada.toLowerCase(), name: marinaChannel.Lazada}
    ];

    // console.log(channelTab);
    // console.log(searchParams.toString());
    useEffect(() => {
        const fetchData = async () => {
            let data:any[] = [];
            try {
                router.push(`${pathname}?c=${channelTab.toLowerCase()}`);
                const ordersData = await getOrdersCnl(channelTab.toLowerCase());
                // console.log(ordersData);
                data = ordersData;
            } catch (err) {
                console.log(err);
                console.log('Error getting orders data: ', err);
            }
            setTableData(data);
        };
        if (channelTab) {
            fetchData();
        }
    }, [channelTab]);
    
    const inactiveChannel:any[] = [];
    channels.forEach(channel => {
        let isExist = false;
        tabsData.tabsData.forEach((activeTabs:any) => {
            if (channel.name.toLowerCase().includes(activeTabs.name.toLowerCase())) {
                isExist = true;
            }
        });
        if (!isExist) {
            inactiveChannel.push(channel.id);
        }
    });

    // console.log(inactiveChannel)
    return (
        <Card>
            <CardBody>
                {/* <p>Make beautiful websites regardless of your design experience.</p> */}
                <div className="flex w-full flex-col">
                    <Tabs aria-label="Dynamic tabs" 
                        disabledKeys={inactiveChannel} 
                        defaultSelectedKey={channelTab}
                        onSelectionChange={(tabKey) => setChannelTab(tabKey)}
                        fullWidth={true} 
                        items={channels} >
                        {(item:any) => (
                        <Tab key={item.id} title={item.name}>
                            <OrdersStatusTabs currentData={tableData} channel={channelTab}></OrdersStatusTabs>
                        </Tab>
                        )}
                    </Tabs>
                </div>  
            </CardBody>
        </Card>
    )
}