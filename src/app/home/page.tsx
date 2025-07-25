import { Metadata } from "next";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { SignIn } from "@/components/signin/signin";

export const metadata: Metadata = {
  title: "Orders | Marina Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = async () => {
    return (
        <DefaultLayout>
             <div className="mx-auto max-w-242.5">
                <Breadcrumb pageName="Overview" />
                <ECommerce />
            </div>
        </DefaultLayout>
    );
};

export default TablesPage;
