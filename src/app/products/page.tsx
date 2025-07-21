import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Card, CardBody} from "@nextui-org/react";
import { listChannel } from "../actions/channel/actions";
import { ProductsLayout } from "@/components/Layouts/ProductsLayout";

const ProductsPage = async ({searchParams} : {
    searchParams: Promise < {
        [key: string]: string
    } >
}) => {
    let channels = await listChannel();
    // const [activeStatusTab, setActiveStatusTab] : any = useState();
    // const [page, setPage] = useState(1);

    let tabs = [
        {
          id: "tokopedia",
          label: "Tokopedia",
          content: "Tokopedia"
        },
        {
          id: "Shopee",
          label: "Shopee",
          content: "Shopee"
        },
        {
          id: "BliBli",
          label: "BliBli",
          content: "BliBli"
        },
        {
          id: "Tiktok",
          label: "Tiktok",
          content: "Tiktok"
        },
        {
          id: "Lazada",
          label: "Lazada",
          content: "Lazada"
        }
    ];
    let inactiveTabs: any[] = [];
    let defaultSelected = '';
    if (channels.length > 0) {
        tabs.forEach((tab:any) => {
            let isExist = false;
            channels.forEach((channel:{name:string}) => {
                if (channel.name.toLowerCase().includes(tab.id.toLowerCase())) {
                    if (defaultSelected === '') {
                        defaultSelected = tab.id;
                    }
                    isExist = true;
                }
            });
            if (!isExist) {
                inactiveTabs.push(tab.id);
            }
        })
    }

    return (
        <DefaultLayout>
        <Breadcrumb pageName="Products" />
            <Card>
                <CardBody>
                    <ProductsLayout
                    inactiveTabs={inactiveTabs}
                    defaultSelected={defaultSelected}
                    tabs={tabs} />
                </CardBody>
            </Card>
        </DefaultLayout>
    );
};

export default ProductsPage;
