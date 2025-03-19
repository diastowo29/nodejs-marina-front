"use client";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react"
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import DataTable from 'react-data-table-component';
import { listChatComments } from "@/app/actions/chat/actions";
import { ChatSidebar } from "./ChatSidebar";
import { getOrdersByUser } from "@/app/actions/order/actions";
import { getListProductsbyStore } from "@/app/actions/product/actions";
import { ChatSidebarV2 } from "./ChatSidebarv2";
// import { UserContext } from "@auth0/nextjs-auth0/client";

// import io from 'socket.io-client';
// const socket = io('http://localhost:3000');

export const ChatListTable = (chat:any) => {
  // const UserContext = UserContext();
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
  const [productList, setProductList] = useState([]); 
  
  const [seed, setSeed] = useState(1);
  
  // console.log(selectedContact);
  const handleContactClick = async (contact:any) => {
    // console.log(contact);
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
      // const chatList = await listChatComments(contact.id);
      // const orderList = await getOrdersByUser(contact.omnichat_user.origin_id);
      // setOrderList(orderList);
      // setListComments(chatList.messages);

      setListComments(chatData[0].messages);
      setOrderList(chatData[1]);
      // setProductList(chatData[2]);

      setLoading(false);
      // console.log(listComments);
      // console.log(comments)
      setUseSample(false);
  }

  // useEffect(() => {
      // socket.on('message2', async (data) => {
      //   console.log("Recieved from SERVER ::", data);
      // })
    // }, []);

  const paginationComponentOptions = {
    noRowsPerPage: true
  };
    
  return (
      <div className="grid grid-cols-10 gap-2">
        {/* <div className="col-span-2"> */}
        <Card className="col-span-3 h-fit">
          {/* <CardHeader className="justify-between">
              <div className="flex gap-5">
                Recent Chats
              </div>
          </CardHeader>
          <Divider className="mb-4"/> */}
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
                {/* <div>
                  <p>Let&apos;s have a chat..</p>
                  <p>Select one of the contact list on the left</p>
                </div> */}
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