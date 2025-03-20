"use client";
import { Avatar, Card, CardBody, CardFooter } from "@nextui-org/react"
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import DataTable from 'react-data-table-component';
import { listChatComments } from "@/app/actions/chat/actions";
import { getOrdersByUser } from "@/app/actions/order/actions";
import { ChatSidebarV2 } from "./ChatSidebarv2";

export const ChatListTable = (chat:any) => {
  const [orderId, setOrderId]:any = useState();
  const changeOrderId = (id:any, status:string, value:number, source:string) => {
    setOrderId({
      id: id,
      status: status,
      value: value,
      source: source
    });
  };
  const sampleComments = [
    {
      "id": 1,
      "origin_id": "83239847234",
      "createdAt": "2024-11-01T10:52:55.297Z",
      "line_text": "Hi barang ini ready kah?",
      "omnichat_userId": null,
      "omnichatId": 1,
      "author": "end-user"
    }
  ]

  const sampleContacts = {
    "id": 1,
    "origin_id": "16300072-1234566767",
    "last_message": "Bales dong?",
    "createdAt": "2024-11-01T10:52:55.297Z",
    "updatedAt": "2024-11-01T11:04:43.724Z",
    "storeId": 2,
    "omnichat_userId": 1,
    "store": {
      "id": 2,
      "name": "SellerAPI-ZD-Integration",
      "origin_id": "16300072",
      "status": "active",
      "channelId": 1,
      "userId": 1,
      "channel": {
        "id": 1,
        "name": "tokopedia"
      }
    },
    "omnichat_user": {
      "id": 1,
      "username": "Abah",
      "thumbnailUrl": "https://cdn.tokopedia.com/image.jpg",
      "origin_id": "1234566767",
      "createdAt": "2024-11-01T10:52:55.297Z"
    }
  }

  const ChatCell = ({ row }:any) => (
    <div className="flex gap-5 p-3">
        <div>
            <Avatar isBordered radius="full" size="md" src={row.omnichat_user.thumbnailUrl} />
        </div>
        <div className="flex flex-col gap-1 items-start justify-center">
        <h4 className="text-small font-semibold leading-none text-default-600">{row.omnichat_user.username}</h4>
        <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">{row.store.channel.name}</h4>
        </div>
    </div>
  )

  const chatCol = [
    {
      name: 'Recent Chats',
      cell: (row:any) => <ChatCell row={row} />
    }
  ];
  // console.log(chat);
  const [selectedContact, setSelectedContact] = useState(sampleContacts);
  const [listComments, setListComments] = useState(sampleComments);
  const [useSample, setUseSample] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]); 
  const [seed, setSeed] = useState(1);
  
  const handleContactClick = async (contact:any) => {
      setUseSample(true);
      setListComments([]);
      setSelectedContact(contact);
      setSeed(Math.random());
      setOrderId();
      setLoading(true);
      // const { chat, isLoading, isError } = GetChatComments(contact.id);
      // console.log(chat);

      let chatData = await Promise.all([
        listChatComments(contact.id),
        getOrdersByUser(contact.omnichat_user.origin_id),
        // getListProductsbyStore(contact.storeId)
      ])

      setListComments(chatData[0].messages);
      setOrderList(chatData[1]);
      setLoading(false);
      setUseSample(false);
  }

  const paginationComponentOptions = {
    noRowsPerPage: true
  };
    
  return (
      <div className="grid grid-cols-10 gap-2">
        <Card className="col-span-3 h-fit">
          <CardBody
              id="commentSection"
              className="px-3 py-0 text-small text-default-400">
              <DataTable
                  columns={chatCol}
                  data={chat.chat}
                  pagination
                  pointerOnHover
                  onRowClicked={(row:any) => handleContactClick(row)}
                  noHeader={true}
                  paginationComponentOptions={paginationComponentOptions} />
          </CardBody>
          <CardFooter></CardFooter>
      </Card>
        {/* </div> */}
          {isLoading ?
          <>
          <ChatWindow loading={isLoading} sample={useSample} comments={sampleComments} contacts={sampleContacts}></ChatWindow>
          </>
          : 
          <ChatWindow attached={orderId} loading={isLoading} sample={useSample} comments={listComments} contacts={selectedContact}></ChatWindow> 
          }
          <ChatSidebarV2
          key={seed}
          contacts={selectedContact}
          changeOrderId={changeOrderId} orderId={orderId}
          storeId={selectedContact.storeId}
          orderList={orderList} />
      </div>
  )
}