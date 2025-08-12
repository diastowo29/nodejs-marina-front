import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {Button, Chip} from "@nextui-org/react";
import OrderButton from "@/components/Buttons/ButtonOrder";
import { getOrders } from "@/app/actions/order/actions";
import { marinaChannel, marinaStatusColor } from "@/config/enum";
import { OrderedItems } from "@/components/Tables/OrderedItems";

const TablesPage = async ({ params }: { params: { order: string } }) => {
  let data  = await getOrders(params.order);
  let itemOrdered:any[] = [];

  if (data.error) {
    return (
      <DefaultLayout>
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-2xl font-bold text-red-500">Order not found</h1>
        </div>
      </DefaultLayout>
    )
  }

  if (data.store.channel.name.toString().toLowerCase() == marinaChannel.Lazada.toLowerCase()) {
    data.order_items.forEach((item:any) => {
      let indexFound = itemOrdered.findIndex(i => i.productsId == item.productsId)
      if (indexFound >= 0) {
        itemOrdered[indexFound]['qty'] = (itemOrdered[indexFound]['qty'])+1;
      } else {
        itemOrdered.push(item);
      }
    });
    // console.log(itemOrdered);
  } else {
    itemOrdered = data.order_items;
  }

  // console.log(itemOrdered);
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

  const descriptionsMap = {
    merge:
      "All commits from the source branch are added to the destination branch via a merge commit.",
    squash:
      "All commits from the source branch are added to the destination branch as a single commit.",
    rebase: "All commits from the source branch are added to the destination branch individually.",
  };

  const labelsMap = {
    merge: "Create a merge commit",
    squash: "Squash and merge",
    rebase: "Rebase and merge",
  };

  const items = [
    {
      key: "chat",
      label: "Chat Buyer",
    },
    {
      key: "reject",
      label: "Reject Order",
    },
    {
      key: "process",
      label: "Process Order",
    }
  ];

  // const currency = item.products.price.toLocaleString('id-ID', { style: 'currency',  currency:(item.products.currency) ? item.products.currency : 'USD'})
  let totalPrice:number = 0;
  let productCurrency:string = "IDR"
  if (!data.total_product_price) {
    totalPrice = data.total_amount-data.shipping_price
  } else {
    totalPrice = data.total_product_price;
  }
  itemOrdered.forEach(item => {
    if (item.products.currency) {
      productCurrency = item.products.currency;
    }
  });  
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
                  <p>{`Recipient address: ${data.recp_addr_full}, ${data.recp_addr_city}, ${data.recp_addr_country}`}</p>
                  <p className="mb-3">{`Contact: ${data.recp_name} - ${data.recp_phone}`}</p>
                  <OrderedItems items={itemOrdered} />
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
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        Product Price
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="relative">
                        {totalPrice.toLocaleString('id-ID', { style: 'currency',  currency:(productCurrency) ? productCurrency : 'USD'})}
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
                        {data.shipping_price.toLocaleString('id-ID', { style: 'currency',  currency:(productCurrency) ? productCurrency : 'USD'})}
                        {/* Rp {data.shipping_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} */}
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
                        {data.total_amount.toLocaleString('id-ID', { style: 'currency',  currency:(productCurrency) ? productCurrency : 'USD'})}
                        {/* Rp {data.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} */}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4.5">
                    <Button color="primary" isDisabled>Print label</Button>
                    <OrderButton channel={data.store.channel.name} status={data.status} orderId={data.id}></OrderButton>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default TablesPage;
