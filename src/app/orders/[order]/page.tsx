import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {Card, CardBody, Link, Chip} from "@nextui-org/react";
import OrderButton from "@/components/Buttons/ButtonOrder";
import { Metadata } from "next";
import { getOrders } from "@/app/actions/order/actions";
import { marinaChannel, marinaStatusColor } from "@/config/enum";

// export const metadata: Metadata = {
//   title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const TablesPage = async ({ params }: { params: { order: string } }) => {
  let data  = await getOrders(params.order);
  let itemOrdered:any[] = [];

  if (data.store.channel.name.toString().toLowerCase() == marinaChannel.Lazada.toLowerCase()) {
    data.order_items.forEach((item:any) => {
      let indexFound = itemOrdered.findIndex(i => i.productsId == item.productsId)
      if (indexFound >= 0) {
        itemOrdered[indexFound]['qty'] = (itemOrdered[indexFound]['qty'])+1;
      } else {
        itemOrdered.push(item);
      }
    });
    console.log(itemOrdered);
  } else {
    itemOrdered = data.order_items;
  }

  const statusColor = (status:any) => {
    switch (status) {
      case 'pending':
        return marinaStatusColor.BLUE;
      case 'completed':
        return marinaStatusColor.GREEN;
      case 'confirmed':
        return marinaStatusColor.GREEN;
      case 'cancelled':
        return marinaStatusColor.YELLOW;
      default:
        return 'default';
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="grid grid-cols-4 border-b border-stroke px-7 py-4 dark:border-strokedark">
                <div className="col-span-3">
                  <h3 className="font-medium text-black dark:text-white">
                    Order Information : {data.invoice ? data.invoice : data.origin_id}
                  </h3>
                </div>
                <div className="flex justify-end">
                  <Chip color={statusColor(data.status)} variant="solid">{data.status}</Chip>
                </div>
              </div>
              <div className="p-7">
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress">Product(s)</label>
                  <div className="relative">
                    {itemOrdered.map((product:any) => (
                      <Card key={product.productsId} className="mb-3">
                        <CardBody>
                          <Link 
                          isExternal 
                          showAnchorIcon 
                          href={`/products/${product.products.id}`}>
                            {product.products.name}</Link>
                          <p>Qty: {product.qty} | Stock: {product.products.stock}</p>
                          <p>SKU: {product.products.sku}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                      Shipping Address
                    </label>
                    <div className="relative">
                      {data.recp_addr_full}, {data.recp_addr_district}, {data.recp_addr_city}
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/3">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      District
                    </label>
                    <div className="relative">
                      {data.recp_addr_district}
                    </div>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      City
                    </label>
                    <div className="relative">
                      {data.recp_addr_city}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/3">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Recipient Name
                    </label>
                    <div className="relative">
                      {data.recp_name}
                    </div>
                    <div className="relative">
                      {data.recp_phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Billing Details
                </h3>
              </div>
              <div className="p-7">
                {/* <form action="#"> */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Product Price
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Rp {data.total_product_price}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Delivery Courier ({data.logistic.name})
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Rp {data.shipping_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Discount
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Rp 0
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Insurance
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Rp 0
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Total
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Rp {data.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4.5">
                    <OrderButton status={data.status} orderId={data.id}></OrderButton>
                  </div>

                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default TablesPage;
