import {Card, CardHeader, Input,  CardBody, CardFooter, Divider} from "@nextui-org/react";

export const ChatSidebar = (orderList:{orderList:any}) => {
  console.log(orderList);
  let isLoading = true;
  if (isLoading) {

  }
  return (
  <Card className="col-span-2">
    <CardHeader className="justify-between">
      <div className="flex gap-5">
        Chat Sidebar
      </div>
    </CardHeader>
    <Divider className="mb-4"/>
    <CardBody className="max-h-[380px] min-h-[380px] px-3 py-0 text-small text-default-400">
      <div
        // key={message.id}
        className={`flex justify-start`}>
          {isLoading ? 
          <>
          <div>
            <Input
            label="Search for a product"
            labelPlacement="inside"
            size="sm"
              placeholder="Product name"
              className="max-w-xs"></Input>
          </div>
          </> : 
          <>
          <div></div>
          {/* create something cool here */}
          </>}
        {/* <div
          className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg bg-blue-500 text-white`}> */}
          {/* <p>Hello world</p> */}
          {/* <p className="text-xs mt-1 text-gray-400">2024-12-02</p> */}
        {/* </div> */}
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