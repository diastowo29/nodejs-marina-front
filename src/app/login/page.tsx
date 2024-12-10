import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { OrdersTab } from "@/components/Orders/OrdersTabs";
import LoginPage from "@/components/signin/signin";
// import { SignIn } from "@/components/signin/signin";

export const metadata: Metadata = {
  title: "Orders | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = async () => {
    return (
        <LoginPage></LoginPage>
        // <SignIn></SignIn>
    );
};

export default TablesPage;
