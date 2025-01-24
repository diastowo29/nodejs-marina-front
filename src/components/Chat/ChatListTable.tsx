"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Skeleton } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { ChatSidebar } from "./ChatSidebar";
import { GetChatComments } from "@/functions/swr";
import DataTable from 'react-data-table-component';
import { listChatComments } from "@/app/actions/chat/actions";

// import io from 'socket.io-client';
// const socket = io('http://localhost:3000');

export const ChatListTable = (chat:any) => {
    const sampleComments = [
        {
          "id": 1,
          "origin_id": "83239847234",
          "createdAt": "2024-11-01T10:52:55.297Z",
          "line_text": "Hi barang ini ready kah?",
          "omnichat_userId": null,
          "omnichatId": 1,
          "author": "end-user"
        },
        {
          "id": 2,
          "origin_id": "83211147234",
          "createdAt": "2024-11-01T11:03:00.241Z",
          "line_text": "Halo seller?",
          "omnichat_userId": null,
          "omnichatId": 1,
          "author": "end-user"
        },
        {
          "id": 5,
          "origin_id": "83000147234",
          "createdAt": "2024-11-01T11:04:43.726Z",
          "line_text": "Bales dong?",
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
          name: 'Username',
          selector: (row:any) => row.id,
          cell: (row:any) => <ChatCell row={row} />
      }
    ];
    // console.log(chat);
    const [selectedContact, setSelectedContact] = useState(sampleContacts);
    const [listComments, setListComments] = useState(sampleComments);
    const [useSample, setUseSample] = useState(true);
    const [isLoading, setLoading] = useState(true);
    console.log(selectedContact);
    const handleContactClick = async (contact:any) => {
      // console.log(contact);
        setUseSample(true);
        setListComments([]);
        setSelectedContact(contact);
        setLoading(true);
        // const { chat, isLoading, isError } = GetChatComments(contact.id);
        // console.log(chat);
        const chatList = await listChatComments(contact.id);
        setListComments(chatList.messages);
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
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-2">
            <DataTable
                columns={chatCol}
                data={chat.chat}
                pagination
                pointerOnHover
                onRowClicked={(row:any) => handleContactClick(row)}
                paginationComponentOptions={paginationComponentOptions}
            />
          </div>
            {/* <Table className="col-span-2" hideHeader topContent={chat.topContent} aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                </TableHeader>
                <TableBody style={{cursor:'pointer'}}>
                    {chat.chat.map((contact:any) => (
                    <TableRow key={contact.id} onClick={() => handleContactClick(contact)}>
                        <TableCell>
                        <div className="flex gap-5">
                            <div>
                                <Avatar isBordered radius="full" size="md" src={contact.omnichat_user.thumbnailUrl} />
                            </div>
                            <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{contact.omnichat_user.username}</h4>
                            <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">{contact.last_message}</h4>
                            </div>
                        </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table> */}
            {isLoading ?
            <>
              {/* <div className="col-span-5">
                <label>Loading...</label>
              </div> */}
              <ChatWindow loading={isLoading} sample={useSample} comments={sampleComments} contacts={sampleContacts}></ChatWindow>
            </> : 
                <ChatWindow loading={isLoading} sample={useSample} comments={listComments} contacts={selectedContact}></ChatWindow> 
            }
            {/* <ChatSidebar></ChatSidebar> */}
        </div>
    )
}