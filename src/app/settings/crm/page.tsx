import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getCrm } from "@/app/actions/crm/actions";
import SidebarSetting from "@/components/Settings/SidebarSettings";
import AddCrm from "@/components/Settings/AddCRM";
import { popToast } from "@/app/actions/toast/pop";

export const metadata: Metadata = {
  title: "Settings | Marina"
};

const Settings = async () => {
  const crms = await getCrm();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Settings" />
      <div className="grid grid-cols-7 gap-2">
        <div className="col-span-2 max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
          <SidebarSetting selected="crm"/>
        </div>
        <AddCrm crm={crms}/>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
