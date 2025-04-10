import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChatListTable } from "@/components/Chat/ChatListTable";
import { listChats } from "../actions/chat/actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession, Session } from "@auth0/nextjs-auth0";

export const metadata: Metadata = {
  title: "Chats | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ChatPage = async () => {
  const chat = await listChats();
  // const { user, error, isLoading } = useUser();
  const { user } : any = await getSession();
  console.log(user);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chats" />
      <ChatListTable chat={chat}></ChatListTable>
    </DefaultLayout>
  );
};

export default ChatPage;