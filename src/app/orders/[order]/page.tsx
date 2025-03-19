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
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
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
                  {/* <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={6}
                        placeholder="Write your bio here"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                      ></textarea>
                    </div>
                  </div> */}
                {/* </form> */}
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
