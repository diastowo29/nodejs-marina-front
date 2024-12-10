"use client";
import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {Card, CardHeader, Input,  CardBody, CardFooter, Avatar, Divider, Textarea, Button, Skeleton} from "@nextui-org/react";
import { GetChat } from "@/functions/swr";
import { ChatListTable } from "@/components/Chat/ChatListTable";

// export const metadata: Metadata = {
//   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const ChatPage = () => {

  const { chat, isLoading, isError } = GetChat();

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            // startContent={<SearchIcon className="text-default-300" />}
            // value={filterValue}
            variant="bordered"
            // onClear={() => setFilterValue("")}
            // onValueChange={onSearchChange}
          />
        </div>
      </div>
    )
  });
  if (isError) return <div>Failed to load</div>
  if (!chat) return <div>Loading...</div>

  return (
    <DefaultLayout>
        <Breadcrumb pageName="Chats" />
        {/* <div className="grid grid-cols-4 gap-2"> */}
          {/* <Skeleton> */}
          <ChatListTable chat={chat.chats} topContent={topContent}></ChatListTable>
          {/* </Skeleton> */}
        {/* </div> */}
    </DefaultLayout>
  );
};

export default ChatPage;
