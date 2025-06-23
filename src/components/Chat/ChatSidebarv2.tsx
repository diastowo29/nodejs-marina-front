"use client";
import { searchProducts } from "@/app/actions/product/actions";
import { ListboxWrapper } from "@/app/chats/ListboxWrapper";
import { formatPrice } from "@/functions/price";
import {Card, Input,  CardBody, Listbox, ListboxItem, Tabs, Tab, Table, TableHeader, TableColumn, TableCell, TableBody, TableRow, Modal, ModalContent, ModalHeader, useDisclosure, ModalFooter, Button} from "@nextui-org/react";
import { useState } from "react";
import { OrderContent } from "../Modal/OrderModal";
import { ProductContent } from "../Modal/ProductModal";

export const PackageIcon = () => {
  let svg = (<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M14.5 2a3.5 3.5 0 0 1 3.163 5.001L21 7a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1l3.337.001a3.5 3.5 0 0 1 5.664-3.95A3.48 3.48 0 0 1 14.5 2zM18 13H6v7h12v-7zm2-4H4v2h16V9zM9.5 4a1.5 1.5 0 0 0-.144 2.993L9.5 7H11V5.5a1.5 1.5 0 0 0-1.356-1.493L9.5 4zm5 0l-.144.007a1.5 1.5 0 0 0-1.35 1.349L13 5.5V7h1.5l.144-.007a1.5 1.5 0 0 0 0-2.986L14.5 4z" fillRule="nonzero"/></g></svg>);
  return svg
};

export const SearchIcon = (props:any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ProductPop = () => {
  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  )
};

export const ChatSidebarV2 = (sidebarParams:any) => {
  // const {user, isAuthenticated, getAccessTokenSilently} =
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [orderDetail, setOrderDetail]:any = useState({});
  const [productDetail, setProductDetail]:any = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [productResults, setProductResults] = useState([]);
  const [isProduct, setIsProduct] = useState(false);
  const changeOrderId = sidebarParams.changeOrderId;

  const sendToChat = (closeModal:any) => {
    let id = (orderDetail.origin_id) ?? productDetail.origin_id;
    let amount = (orderDetail.total_amount) ?? productDetail.price;
    let status = (orderDetail.status) ?? 0;
    let source = (orderDetail.origin_id) ? 'order' : 'product';
    changeOrderId(id, status, amount, source);
    closeModal();
  }

  const OrdersCell = ({row}:any) => {
    return (
    <div className="flex flex-col">
      <p className="text-bold text-small capitalize">{row.origin_id}</p>
      <label className="text-bold text-tiny capitalize text-default-400">Rp. {formatPrice(row.total_amount)}</label>
      <p className="text-bold text-tiny capitalize text-default-400">{row.status}</p>
    </div>
  )}

  const ProductsCell = ({row}:any) => {
    return (
    <div className="flex flex-col">
      <p className="text-bold text-small capitalize">{row.name}</p>
      <label className="text-bold text-tiny capitalize text-default-400">Rp. {formatPrice(row.price)}</label>
      <p className="text-bold text-tiny capitalize text-default-400">sku: {row.sku}</p>
    </div>
  )}

  // console.log(sidebarParams.orderList);
  // let isLoading = (sidebarParams.orderList.length > 0) ? false : true;
  // console.log(isLoading);

  const searchProduct = async (product:string) => {
    if (product.length > 3) {
      try {
        let productFound = await searchProducts(product, sidebarParams.storeId);
        setProductResults(productFound.result);
      } catch (err) {
        console.error("Error searching products:", err);
        setProductResults([]);
      }
    }
  }

  const showOrder = async (orderId:string) => {
    setIsProduct(false);
    let orderPicked = sidebarParams.orderList.find((o:{id:string}) => o.id === orderId);
    let orderItems:[] = orderPicked.order_items;
    setOrderItems(orderItems);
    setOrderDetail(orderPicked);
    setProductDetail({});
    onOpen();
  }

  const showProduct = async (productId:Number) => {
    // console.log(productId);
    let productPicked = productResults.find((o:{id:number}) => o.id === productId);
    console.log(productPicked);
    setIsProduct(true);
    setProductDetail(productPicked);
    setOrderDetail({});
    onOpen();
  }

  return (
    <div className="col-span-3 gap-5 h-fit">
      <Card style={{marginBottom: '1rem'}}>
        <CardBody className="in-h-[380px] px-3 py-0 text-small text-default-400">
        <Tabs
        fullWidth={true}
          aria-label="Options"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          color="primary"
          variant="underlined"
        >
          <Tab key="orders"
            title={
              <div className="flex items-center space-x-2">
                <PackageIcon />
                <span>Recent Orders</span>
              </div>
            }>
            <Table fullWidth>
              <TableHeader>
                <TableColumn key={1}>Orders</TableColumn>
              </TableHeader>
              <TableBody items={sidebarParams.orderList} emptyContent={"No orders yet."}>
                {(item:any) => (
                  <TableRow className="cursor-pointer"
                    onClick={() => showOrder(item.id)} 
                    key={item.id}>
                    <TableCell><OrdersCell row={item}/></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Tab>
          <Tab key="product"
            title={
              <div className="flex items-center space-x-2">
                <PackageIcon />
                <span>Products</span>
              </div>
            }
          >
             <Input
              isClearable
              className="max-w-xs"
              label="Search"
              placeholder="Product name/sku"
              type="name"
              variant="bordered"
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
              onValueChange={(product) => searchProduct(product)}
              // eslint-disable-next-line no-console
              onClear={() => console.log("input cleared")}
            />
            <Table fullWidth>
              <TableHeader>
                <TableColumn>Products</TableColumn>
              </TableHeader>
              <TableBody items={productResults} emptyContent={"Product not found"}>
                {(item:any) => (
                  <TableRow className="cursor-pointer"
                  onClick={() => showProduct(item.id)} key={item.id}>
                    <TableCell><ProductsCell row={item}/></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Tab>
          </Tabs>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} size="3xl" className="bangjago" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{(!isProduct) ? `Order ID: ${orderDetail.origin_id}` : productDetail.name}</ModalHeader>
              {(!isProduct) ? 
                <OrderContent orderDetail={orderDetail} orderItems={orderItems}/> 
                : <ProductContent productDetail={productDetail}/>}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {sendToChat(onClose)}}>
                  Send to Chat
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}