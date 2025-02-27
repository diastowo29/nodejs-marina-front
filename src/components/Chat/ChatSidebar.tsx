import {Card, CardHeader, Input,  CardBody, CardFooter, Divider, Snippet, Chip, Link, Button} from "@nextui-org/react";
import DataTable from 'react-data-table-component';

export const DetailIcon = () => {
  return (<svg enable-background="new 0 0 139 139" height="139px" id="Layer_2" version="1.1" viewBox="0 0 139 139" width="139px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M92.674,112.247l-1.559,6.373c-4.677,1.846-8.413,3.251-11.195,4.217c-2.785,0.969-6.021,1.451-9.708,1.451  c-5.662,0-10.066-1.387-13.207-4.142c-3.141-2.766-4.712-6.271-4.712-10.523c0-1.646,0.114-3.339,0.351-5.064  c0.239-1.727,0.619-3.672,1.139-5.846l5.845-20.688c0.52-1.981,0.962-3.858,1.316-5.633c0.359-1.764,0.532-3.387,0.532-4.848  c0-2.642-0.547-4.49-1.636-5.529c-1.089-1.036-3.167-1.562-6.252-1.562c-1.511,0-3.064,0.242-4.647,0.71  c-1.59,0.47-2.949,0.924-4.09,1.346l1.563-6.378c3.829-1.559,7.489-2.894,10.99-4.002c3.501-1.111,6.809-1.667,9.938-1.667  c5.623,0,9.962,1.359,13.009,4.077c3.047,2.72,4.57,6.246,4.57,10.591c0,0.899-0.1,2.483-0.315,4.747  c-0.21,2.269-0.601,4.348-1.171,6.239l-5.82,20.605c-0.477,1.655-0.906,3.547-1.279,5.676c-0.385,2.115-0.569,3.731-0.569,4.815  c0,2.736,0.61,4.604,1.833,5.597c1.232,0.993,3.354,1.487,6.368,1.487c1.415,0,3.025-0.251,4.814-0.744  C90.567,113.059,91.868,112.626,92.674,112.247z M94.151,25.741c0,3.59-1.353,6.656-4.072,9.177c-2.712,2.53-5.98,3.796-9.803,3.796  c-3.835,0-7.111-1.266-9.854-3.796c-2.738-2.522-4.11-5.587-4.11-9.177c0-3.583,1.372-6.654,4.11-9.207  c2.738-2.549,6.02-3.823,9.854-3.823c3.822,0,7.091,1.277,9.803,3.823C92.799,19.087,94.151,22.159,94.151,25.741z"/></svg>)
}

export const ChatSidebar = (orderList:any) => {
  const changeOrderId = orderList.changeOrderId;
  const attachOrder = (order:any) => {
    changeOrderId(order.id);
  }

  const OrdersCell = ({ row }:any) => (
    <div className="flex p-3">
        <div className="flex flex-col gap-1 items-start justify-center">
          {/* <Snippet radius="none" hideSymbol disableTooltip disableAnimation size="md">{row.origin_id}</Snippet> */}
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">ID: {row.origin_id}</h4>
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">Rp {row.total_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h4>
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">Date: {new Date(row.createdAt).toLocaleDateString()}</h4>
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ...">{new Date(row.createdAt).toLocaleTimeString()}</h4>
          <h4 className="text-small leading-none text-default-600 truncate text-ellipsis overflow-hidden ..."><Chip>Status: {row.status}</Chip></h4>
          {/* <div> */}
            {/* <Button showAnchorIcon href="/orders" color="primary" size="md" as={Link}>Details</Button> */}
            {/* <Link showAnchorIcon size="sm" href={"/orders/"}>See Details</Link> */}
          {/* </div> */}
        </div>
    </div>
  )

  const ActionsCell = ({ row }:any) => (
    <div className="flex p-3">
        <div className="flex flex-col gap-1 items-start justify-center">
            <Button showAnchorIcon href={`/orders/${row.id}`} color="primary" size="md" as={Link}>
              {/* <DetailIcon/> */}
            </Button>
            <Button href="/orders" onClick={() => attachOrder(row)} size="md">Attach</Button>
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
  let isLoading = (orderList.orderList.length > 0) ? false : true;
  // console.log(isLoading);
  return (
  <Card className="col-span-3 h-fit">
    {/* <CardHeader className="justify-between">
      <div className="flex gap-5">
        Chat Sidebar
      </div>
    </CardHeader>
    <Divider className="mb-4"/> */}
    <CardBody className="in-h-[380px] w-fit px-3 py-0 text-small text-default-400">
      <div
        // key={message.id}
        className={`flex justify-start`}>
          {!isLoading ? 
          <>
          <div>
            <DataTable 
            noHeader={true}
            columns={orderCols} 
            // expandableRows
            data={orderList.orderList} />
          </div>
          </> : 
          <>
          <div>
          <DataTable 
            noHeader={true}
            columns={orderCols} 
            // expandableRows
            data={orderList.orderList} />
          </div>
          {/* create something cool here */}
          </>}
      </div>
    </CardBody>
    <CardFooter className="gap-3">
      {/* <Textarea
        label="Enter message"
        minRows={2}
        placeholder="Enter your message"
        className="max-w-xs"
      /> */}
    </CardFooter>
  </Card>
  )
}