
'use client';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

import { useState, useEffect } from "react";
import { OrdersStatusTabs } from "./OrdersStatusTabs";
import { INT_ORDER_BYCHANNEL } from "@/urls/internal";
import { getOrdersCnl } from "@/app/actions/order/actions";

export const OrdersTab = (tabsData : any) => {
    const [channelTab, setChannelTab] : any = useState(null);
    const [tableData, setTableData] = useState(tabsData.initTableData);
    const [loading, setLoading] = useState(false);
    // console.log(tabsData);
    const channels = [
        { id:'Tokopedia', name:'Tokopedia'}, 
        { id:'Shopee', name:'Shopee'}, 
        { id:'Tiktok', name:'Tiktok'}, 
        { id:'BliBli', name:'BliBli'}, 
        { id:'Lazada', name:'Lazada'}, 
        {id: 'Bukalapak', name: 'Bukalapak'}]

    useEffect(() => {
        const fetchData = async () => {
            let data:any[] = [];
            try {
                const ordersData = await getOrdersCnl(channelTab.toLowerCase());
                console.log(ordersData);
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
            if (channel.name.toLocaleLowerCase().includes(activeTabs.name.toLowerCase())) {
                isExist = true;
            }
        });
        if (!isExist) {
            inactiveChannel.push(channel.name);
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
                        // selectedKey={selected}
                        onSelectionChange={(tabKey) => setChannelTab(tabKey)}
                        fullWidth={true} 
                        items={channels} >
                        {(item:any) => (
                        <Tab key={item.id} title={item.name}>
                            <OrdersStatusTabs currentData={tableData}></OrdersStatusTabs>
                        </Tab>
                        )}
                    </Tabs>
                </div>  
            </CardBody>
        </Card>
    )
}