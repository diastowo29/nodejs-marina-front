"use client"
import React, { Key, Suspense, useEffect, useState } from "react"
import { ChannelTabs } from "../Tabs/ChannelTabs"
import { ProductsTable } from "../Tables/ProductsTable"
import { getProductByChannel } from "@/app/actions/product/actions";
import { Progress, Skeleton } from "@nextui-org/react";
import { popToast } from "@/app/actions/toast/pop";

interface ChannelTabsProps {
    defaultSelected: string;
    inactiveTabs?: string[];
    tabs?: { id: string, label: string, content:string }[];
}

export const ProductsLayout = ({inactiveTabs, defaultSelected, tabs}:ChannelTabsProps) => {
    const [productsData, setProductsData]: any[] = useState<any>([]);
    const [channel, setChannel] = useState<Key>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // setLoading(true);
        let query = (channel) ? channel.toString() : defaultSelected.toString();
        const updateData = async () => {
            // let data:any[] = [];
            try {
                const productList = await getProductByChannel(query);
                const data = [...productList];
                setLoading(false);
                console.log('got products');
                setProductsData(data);
                console.log('productsLayout: ', productsData.length);
            } catch (err) {
                popToast('Connection error..', "error");
                setLoading(false);
            }
        }
        if (loading) {
            updateData();
        }
    }, [channel, productsData, loading])

    return (
        <div className="flex w-full flex-col">
            <ChannelTabs
                selectedKey={defaultSelected}
                // inactiveTabs={inactiveTabs}
                channels={tabs}
                onTabChange={(key) => {
                    setProductsData([]);
                    setLoading(true);
                    setChannel(key);
                    }} >
                   {loading ? 
                    <div className="flex justify-center items-center h-[300px]">
                        <Progress isIndeterminate aria-label="Loading..." className="max-w-md" size="sm" />
                    </div>
                    : 
                    <ProductsTable productsList={productsData}/>
                   } 
            </ChannelTabs>
        </div>
    )
}