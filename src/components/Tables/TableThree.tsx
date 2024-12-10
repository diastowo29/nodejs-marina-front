"use client";
import { Package } from "@/types/package";
import { Orders } from "@/types/orders";
import { Button } from "flowbite-react";
import { Dropdown, Modal } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
];

const tokpedOrdersData: Orders[] = [
  {
    name: "Coffee Mug - Custom Label - White",
    price: 59000,
    sku: '1238734243',
    invoiceDate: 'Oct 1, 2024',
    status: 'Paid',
    storeName: 'Kelontong Shop',
    courier: 'JNE',
    inv: 'INV/23423/TOK/292432/SDP'
  },
  {
    name: "Type C Charger - Braided White",
    price: 159000,
    sku: '1238734243',
    invoiceDate: 'Oct 1, 2024',
    status: 'Paid',
    storeName: 'Kelontong Shop',
    courier: 'JNE',
    inv: 'INV/23423/TOK/292432/SDP'
  }
]

const shopeeOrdersData: Orders[] = [
  {
    name: "Tumblr 200oz - Custom Label - White",
    price: 59000,
    sku: '1238734243',
    invoiceDate: 'Oct 1, 2024',
    status: 'Paid',
    storeName: 'Kelontong Shopee',
    courier: 'JNE',
    inv: 'INV/23423/TOK/292432/SDP'
  },
  {
    name: "Lightning Charger - Braided White",
    price: 159000,
    sku: '1238734243',
    invoiceDate: 'Oct 1, 2024',
    status: 'Paid',
    storeName: 'Kelontong Shopee',
    courier: 'JNE',
    inv: 'INV/23423/TOK/292432/SDP'
  }
]

interface tableProps {
  channelName: string | null;
}
const TableThree = ({channelName}: tableProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalSize, setModalSize] = useState<string>('md');
  console.log(channelName);
  let ordersData: Orders[] = [];
  switch (channelName) {
    case 'tokopedia':
      ordersData = tokpedOrdersData;
      break;
    default:
      ordersData = shopeeOrdersData;
      break;
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
        <Modal show={openModal} size='4xl' onClose={() => setOpenModal(false)}>
              <Modal.Header>Terms of Service</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                    companies around the world are updating their terms of service agreements to comply.
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                    to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                    soon as possible of high-risk data breaches that could personally affect them.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setOpenModal(false)}>I accept</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal>
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Product(s)
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Store
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Courier
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((ordersItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {ordersItem.name}
                  </h5>
                  {/* <p className="text-sm">Rp {ordersItem.price}</p> */}
                  <p className="text-sm">SKU: ${ordersItem.sku}  x 1</p>
                  <p className="text-sm">Invoice: ${ordersItem.inv}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {ordersItem.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {ordersItem.storeName}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    Rp {ordersItem.price}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      ordersItem.status === "Paid"
                        ? "bg-success text-success"
                        : ordersItem.status === "Unpaid"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {ordersItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Dropdown label="Action" dismissOnClick={true}>
                      <Dropdown.Item as={Link} href="/orders/123">View</Dropdown.Item>
                      <Dropdown.Item onClick={() => setOpenModal(true)}>Take order</Dropdown.Item>
                      <Dropdown.Item onClick={() => alert('Dashboard!')}>Reject</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => alert('Dashboard!')}>Chat Customer</Dropdown.Item>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default TableThree;
