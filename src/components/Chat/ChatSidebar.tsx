import { ListboxWrapper } from "@/app/chats/ListboxWrapper";
import {Card, CardHeader, Input,  CardBody, CardFooter, Divider, Snippet, Chip, Link, Button, Image, pagination, Listbox, ListboxItem} from "@nextui-org/react";
import DataTable from 'react-data-table-component';

export const DetailIcon = () => {
  return (<svg enable-background="new 0 0 139 139" height="139px" id="Layer_2" version="1.1" viewBox="0 0 139 139" width="139px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M92.674,112.247l-1.559,6.373c-4.677,1.846-8.413,3.251-11.195,4.217c-2.785,0.969-6.021,1.451-9.708,1.451  c-5.662,0-10.066-1.387-13.207-4.142c-3.141-2.766-4.712-6.271-4.712-10.523c0-1.646,0.114-3.339,0.351-5.064  c0.239-1.727,0.619-3.672,1.139-5.846l5.845-20.688c0.52-1.981,0.962-3.858,1.316-5.633c0.359-1.764,0.532-3.387,0.532-4.848  c0-2.642-0.547-4.49-1.636-5.529c-1.089-1.036-3.167-1.562-6.252-1.562c-1.511,0-3.064,0.242-4.647,0.71  c-1.59,0.47-2.949,0.924-4.09,1.346l1.563-6.378c3.829-1.559,7.489-2.894,10.99-4.002c3.501-1.111,6.809-1.667,9.938-1.667  c5.623,0,9.962,1.359,13.009,4.077c3.047,2.72,4.57,6.246,4.57,10.591c0,0.899-0.1,2.483-0.315,4.747  c-0.21,2.269-0.601,4.348-1.171,6.239l-5.82,20.605c-0.477,1.655-0.906,3.547-1.279,5.676c-0.385,2.115-0.569,3.731-0.569,4.815  c0,2.736,0.61,4.604,1.833,5.597c1.232,0.993,3.354,1.487,6.368,1.487c1.415,0,3.025-0.251,4.814-0.744  C90.567,113.059,91.868,112.626,92.674,112.247z M94.151,25.741c0,3.59-1.353,6.656-4.072,9.177c-2.712,2.53-5.98,3.796-9.803,3.796  c-3.835,0-7.111-1.266-9.854-3.796c-2.738-2.522-4.11-5.587-4.11-9.177c0-3.583,1.372-6.654,4.11-9.207  c2.738-2.549,6.02-3.823,9.854-3.823c3.822,0,7.091,1.277,9.803,3.823C92.799,19.087,94.151,22.159,94.151,25.741z"/></svg>)
}

const ShareIcon = () => {
  // let svg = (<svg enable-background="new 0 0 48 48" height="48px" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M34,47H14c-2.762,0-5-2.238-5-5V24c0-2.761,2.238-5,5-5h4c0.553,0,1,0.448,1,1  s-0.447,1-1,1h-4c-1.656,0-3,1.344-3,3v18c0,1.657,1.344,3,3,3h20c1.657,0,3-1.343,3-3V24c0-1.656-1.343-3-3-3h-4  c-0.553,0-1-0.448-1-1s0.447-1,1-1h4c2.762,0,5,2.239,5,5v18C39,44.762,36.762,47,34,47z M31.334,10.715L25,4.381V30  c0,0.553-0.447,1-1,1s-1-0.447-1-1V4.381l-6.334,6.334c-0.381,0.381-0.999,0.381-1.381,0c-0.381-0.381-0.381-1,0-1.381l7.905-7.905  c0.032-0.047,0.053-0.101,0.095-0.144c0.195-0.194,0.451-0.287,0.705-0.283C23.994,1.002,23.996,1,24,1s0.007,0.002,0.01,0.002  c0.256-0.003,0.511,0.089,0.705,0.283c0.041,0.042,0.06,0.094,0.091,0.14l7.909,7.909c0.381,0.381,0.381,1,0,1.381  C32.333,11.096,31.715,11.096,31.334,10.715z" fill-rule="evenodd"/></svg>)
  // let svg = (<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><polyline fill="none" points="176 152 224 104 176 56" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/><path d="M192,216H40a8,8,0,0,1-8-8V88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/><path d="M75,176a96.1,96.1,0,0,1,93-72h56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/></svg>)
  // let svg = (<svg height="72" viewBox="0 0 72 72" width="72" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#4A4A4A"/><path d="M21.855,43.51 C23.681,43.51 25.363,42.885 26.697,41.838 L41.603,49.197 C41.603,49.227 41.601,49.254 41.601,49.283 C41.601,53.621 45.119,57.139 49.457,57.139 C53.794,57.139 57.312,53.621 57.312,49.283 C57.312,44.946 53.794,41.428 49.457,41.428 C47.148,41.428 45.074,42.422 43.638,44.006 L29.582,37.067 C29.664,36.61 29.71,36.139 29.71,35.656 C29.71,35.559 29.707,35.463 29.703,35.367 L44.244,27.731 C45.632,28.961 47.457,29.711 49.457,29.711 C53.796,29.711 57.312,26.194 57.312,21.856 C57.312,17.516 53.794,14 49.457,14 C45.119,14 41.601,17.516 41.601,21.856 C41.601,22.18 41.625,22.498 41.662,22.811 L27.533,30.231 C26.103,28.735 24.089,27.801 21.855,27.801 C17.517,27.801 14,31.319 14,35.656 C14,39.994 17.517,43.51 21.855,43.51" fill="#FFF"/></g></svg>);
  // let svg = (<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.25 3.5C9.52817 3.5 11.3877 5.29251 11.4951 7.54408L11.5 7.75V18.5C11.5 19.8807 10.3807 21 9 21C7.67452 21 6.58996 19.9685 6.50532 18.6644L6.5 18.5V9C6.5 8.58579 6.83579 8.25 7.25 8.25C7.6297 8.25 7.94349 8.53215 7.99315 8.89823L8 9V18.5C8 19.0523 8.44772 19.5 9 19.5C9.51284 19.5 9.93551 19.114 9.99327 18.6166L10 18.5V7.75C10 6.23122 8.76878 5 7.25 5C5.78747 5 4.5916 6.1417 4.50502 7.58248L4.5 7.75V17C4.5 17.4142 4.16421 17.75 3.75 17.75C3.3703 17.75 3.05651 17.4678 3.00685 17.1018L3 17V7.75C3 5.40279 4.90279 3.5 7.25 3.5ZM16.25 16C16.6642 16 17 16.3358 17 16.75C17 17.1297 16.7178 17.4435 16.3518 17.4932L16.25 17.5H13.75C13.3358 17.5 13 17.1642 13 16.75C13 16.3703 13.2822 16.0565 13.6482 16.0068L13.75 16H16.25ZM20.25 13C20.6642 13 21 13.3358 21 13.75C21 14.1297 20.7178 14.4435 20.3518 14.4932L20.25 14.5H13.75C13.3358 14.5 13 14.1642 13 13.75C13 13.3703 13.2822 13.0565 13.6482 13.0068L13.75 13H20.25ZM20.25 10C20.6642 10 21 10.3358 21 10.75C21 11.1297 20.7178 11.4435 20.3518 11.4932L20.25 11.5H13.75C13.3358 11.5 13 11.1642 13 10.75C13 10.3703 13.2822 10.0565 13.6482 10.0068L13.75 10H20.25ZM20.25 7C20.6642 7 21 7.33579 21 7.75C21 8.1297 20.7178 8.44349 20.3518 8.49315L20.25 8.5H13.75C13.3358 8.5 13 8.16421 13 7.75C13 7.3703 13.2822 7.05651 13.6482 7.00685L13.75 7H20.25Z" fill="#212121"/></svg>);
  let svg = (<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.9999 2C19.3136 2 21.9999 4.68629 21.9999 8C21.9999 9.41133 21.5093 10.7466 20.6383 11.8064C20.0055 11.4569 19.3083 11.2098 18.569 11.0875L18.7994 10.8571L18.958 10.6927C19.6231 9.96299 19.9999 9.0125 19.9999 8C19.9999 5.79086 18.2091 4 15.9999 4C14.9383 4 13.9453 4.4146 13.2048 5.13858L13.0501 5.29842L13.0316 5.31139L3.70629 14.6403C3.31585 15.0309 2.68269 15.031 2.29207 14.6406C1.90146 14.2501 1.90132 13.617 2.29176 13.2264L11.6007 3.91324L11.6473 3.87021C12.7712 2.68577 14.3316 2 15.9999 2ZM11.0872 18.5679C11.2112 19.3176 11.4634 20.024 11.8205 20.6638L11.479 21.0053L11.4259 21.0548L11.3702 21.0997C10.7009 21.6759 9.84594 22 8.9429 22C6.88779 22 5.22179 20.334 5.22179 18.2789C5.22179 17.3775 5.54481 16.5248 6.11735 15.8574L6.26564 15.6945L6.28072 15.6826L13.5717 8.37879C13.9619 7.98793 14.5951 7.98737 14.986 8.37755C15.3768 8.76774 15.3774 9.4009 14.9872 9.79177L7.69618 17.0956L7.68524 17.1039C7.38894 17.4208 7.22179 17.8354 7.22179 18.2789C7.22179 19.2294 7.99236 20 8.9429 20C9.32185 20 9.67979 19.8781 9.97412 19.6571L10.0962 19.5564L10.097 19.558L11.0872 18.5679ZM22.9999 17.5C22.9999 20.5376 20.5375 23 17.4999 23C14.4624 23 11.9999 20.5376 11.9999 17.5C11.9999 14.4624 14.4624 12 17.4999 12C20.5375 12 22.9999 14.4624 22.9999 17.5ZM14.4999 17C14.2238 17 13.9999 17.2239 13.9999 17.5C13.9999 17.7761 14.2238 18 14.4999 18L19.2928 18L17.6464 19.6464C17.4511 19.8417 17.4511 20.1583 17.6464 20.3536C17.8416 20.5488 18.1582 20.5488 18.3535 20.3536L20.8535 17.8536C21.0488 17.6583 21.0488 17.3417 20.8535 17.1464L18.3535 14.6464C18.1582 14.4512 17.8416 14.4512 17.6464 14.6464C17.4511 14.8417 17.4511 15.1583 17.6464 15.3536L19.2928 17L14.4999 17Z" fill="#212121"/></svg>);
  return svg;
}

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
}

export const ChatSidebar = (sidebarParams:any) => {
  const changeOrderId = sidebarParams.changeOrderId;
  console.log(sidebarParams)
  const attachOrder = (order:any) => {
    changeOrderId(order.id);
  }

  const OrdersCell = ({ row }:any) => (
    <div className="flex p-3">
        <div className="flex flex-col gap-1 items-start justify-center">
          {/* <Snippet radius="none" hideSymbol disableTooltip disableAnimation size="md">{row.origin_id}</Snippet> */}
          <Link showAnchorIcon size="sm" href={`/orders/${row.id}`}>
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">ID: {row.origin_id}</h4>
          </Link>
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">Rp {row.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h4>
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">Date: {new Date(row.createdAt).toLocaleDateString()}</h4>
          {/* <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">{new Date(row.createdAt).toLocaleTimeString()}</h4> */}
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ..."><Chip>Status: {row.status}</Chip></h4>
          {/* <div> */}
            {/* <Button showAnchorIcon href="/orders" color="primary" size="md" as={Link}>Details</Button> */}
            {/* <Link showAnchorIcon size="sm" href={"/orders/"}>See Details</Link> */}
          {/* </div> */}
        </div>
    </div>
  )

  const ProductCell = ({ row }:any) => (
    <div className="flex p-3">
        <div className="flex flex-col gap-1 items-start justify-center">
          <Card isBlurred className="py-2">
            <CardBody className="overflow-visible py-2">
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={(row.product_img[0]) ? row.product_img[0].originalUrl : ''}
                    width={100}
                  />
                </div>
                <div className="relative col-span-6">
                  <Link size="sm" href={`/products/${row.id}`}>
                    <p className="text-tiny uppercase font-bold">{row.name}</p>
                  </Link>
                  <small className="text-default-500">Rp. {row.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</small>
                </div>
              </div>
              
              {/* <div className="relative py-4"> */}
              {/* </div> */}
            </CardBody>
          </Card>
          <Button isIconOnly>
            <ShareIcon/>
          </Button>
        </div>
    </div>
  )

  const ActionsCell = ({ row }:any) => (
    <div className="flex p-5">
        <div className="flex flex-col gap-1 items-start justify-center">
            {/* <Button showAnchorIcon href={`/orders/${row.id}`} color="primary" size="md" as={Link}></Button> */}
            <Button isIconOnly onClick={() => attachOrder(row)}>
              <ShareIcon/>
            </Button>
        </div>
    </div>
  )

  const orderCols = [
    {
      name: 'Recent Orders',
      cell: (row:any) => <OrdersCell row={row} />
    },
    {
      cell: (row:any) => <ActionsCell row={row} />
    }
  ];

  const productsCols = [
    {
      name: 'Products List',
      cell: (row:any) => <ProductCell row={row} />
    }
  ];
  
  const paginationComponentOptions = {
    noRowsPerPage: true
  };
  let isLoading = (sidebarParams.orderList.length > 0) ? false : true;
  // console.log(isLoading);
  return (
    <div className="col-span-3 gap-5 h-fit">
      <Card style={{marginBottom: '1rem'}}>
        <CardBody className="in-h-[380px] w-fit px-3 py-0 text-small text-default-400">
          <div className={`flex justify-start`}>
              {/* {!isLoading ? 
              <>
              <div>
                <DataTable 
                noHeader={true}
                columns={orderCols} 
                data={sidebarParams.orderList} />
              </div>
              </> :  */}
              <>
              <div>
              <DataTable 
                pagination
                paginationPerPage={5}
                noHeader={true}
                columns={orderCols} 
                data={sidebarParams.orderList}
                paginationComponentOptions={paginationComponentOptions} />
              </div>
              </>
              {/* } */}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="in-h-[380px] w-fit px-3 py-0 text-small text-default-400">
          <div className={`flex justify-start`}>
             {/*  {!isLoading ? 
              <>
              <div>
                <DataTable 
                noHeader={true}
                columns={productsCols} 
                data={sidebarParams.productList} />
              </div>
              </> :  */}
              <>
              <div>
              <DataTable 
                noHeader={true}
                pagination
                paginationPerPage={5}
                columns={productsCols} 
                data={sidebarParams.productList}
                paginationComponentOptions={paginationComponentOptions} />
              </div>
              </>
              {/* } */}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}