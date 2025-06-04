
'use client';
import {Tabs, Tab, Card, CardBody, Skeleton, Progress} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { OrdersStatusTabs } from "./OrdersStatusTabs";
import { getOrdersCnl } from "@/app/actions/order/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { marinaChannel } from "@/config/enum";
import { ToastContainer, toast } from 'react-toastify';

export const OrdersTab = (tabsData : any) => {
    const searchParams = useSearchParams();
    const router  = useRouter();
    const pathname = usePathname();

    const [channelTab, setChannelTab] : any = useState(searchParams.get('c') || null);
    const [tableData, setTableData] = useState(tabsData.initTableData);
    const [loading, setLoading] = useState(false);

    const channels = [
        { id: marinaChannel.Tokopedia.toLowerCase(), name: marinaChannel.Tokopedia}, 
        { id: marinaChannel.Shopee.toLowerCase(), name: marinaChannel.Shopee}, 
        { id: marinaChannel.Tiktok.toLowerCase(), name: marinaChannel.Tiktok}, 
        { id: marinaChannel.BliBli.toLowerCase(), name: marinaChannel.BliBli}, 
        { id: marinaChannel.Lazada.toLowerCase(), name: marinaChannel.Lazada}
    ];
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            let data:any[] = [];
            try {
                router.push(`${pathname}?c=${channelTab.toLowerCase()}`);
                const ordersData = await getOrdersCnl(channelTab.toLowerCase());
                setLoading(false);
                data = ordersData;
            } catch (err) {
                toast('Connection error.. ', {
                    type: 'error'
                });
                setLoading(false);
                console.log(err);
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

    return (
        <Card>
            <CardBody>
                <div className="flex w-full flex-col">
                    <ToastContainer
                    position="bottom-right"
                    autoClose={3000}/>
                    <Tabs aria-label="Dynamic tabs" 
                        disabledKeys={inactiveChannel} 
                        defaultSelectedKey={channelTab}
                        onSelectionChange={(tabKey) => setChannelTab(tabKey)}
                        fullWidth={true} 
                        items={channels} >
                        {(item:any) => (
                        <Tab key={item.id} title={item.name}>
                            {loading ? 
                            <div className="flex justify-center items-center h-[300px]">
                                <Progress isIndeterminate aria-label="Loading..." className="max-w-md" size="sm" />
                            </div>
                            : 
                            <OrdersStatusTabs currentData={tableData} channel={channelTab}></OrdersStatusTabs>
                            }
                        </Tab>
                        )}
                    </Tabs>
                </div>
            </CardBody>
        </Card>
    )
}