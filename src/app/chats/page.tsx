import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChatListTable } from "@/components/Chat/ChatListTable";
import { listChats } from "../actions/chat/actions";

export const metadata: Metadata = {
  title: "Chats | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ChatPage = async () => {
  const chat = await listChats();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chats" />
      <ChatListTable chat={chat}></ChatListTable>
    </DefaultLayout>
  );
};

export default ChatPage;
