import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChatListTable } from "@/components/Chat/ChatListTable";
import { listChats } from "../actions/chat/actions";
import { auth0 } from "@/lib/auth0";

export const metadata: Metadata = {
  title: "Chats | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ChatPage = async () => {
  // const session = await auth0.getSession();
  const chat = await listChats().catch((err) => {
    console.log(err);
    // should be on client components
    // popToast("Could not connect to server, please contact admin", "error");
  })
  // const { user, error, isLoading } = useUser();
  // const { user } : any = await getSession();
  // console.log(user);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chats" />
      <ChatListTable chat={chat.omnichat} tenantId={chat.tenant_id}></ChatListTable>
    </DefaultLayout>
  );
};

export default ChatPage;