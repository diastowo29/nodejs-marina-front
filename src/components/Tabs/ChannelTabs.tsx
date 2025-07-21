"use client";
import { Tab, Tabs } from "@nextui-org/react"
import React, { Key, useState } from "react";

interface ChannelTabsProps {
    children: React.ReactNode;
    selectedKey?: string;
    inactiveTabs?: string[];
    channels?: { id: string, label: string, content:string }[];
    onTabChange?: (key: Key) => void;
}

export const ChannelTabs = ({children, selectedKey, inactiveTabs, channels, onTabChange}:ChannelTabsProps) => {
    return (
        <Tabs defaultSelectedKey={selectedKey}
        disabledKeys={inactiveTabs} 
        onSelectionChange={onTabChange}
        fullWidth={true} 
        aria-label="Dynamic tabs" 
        items={channels}>
        {(item: {id: string, label:string, content:string}) => (
          <Tab key={item.id} title={item.label}>
            {children}
          </Tab>
        )}
      </Tabs>
    );
}