import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrdersPage from "./orders/page";
import { OrdersTab } from "@/components/Orders/OrdersTabs";
// import { auth0 } from "@/lib/auth0";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  return (
    <>
      <OrdersPage/>
    </>
  );
}
