import {Card, CardHeader, Input,  CardBody, CardFooter, Avatar, Divider, Textarea, Button, Skeleton} from "@nextui-org/react";

export const ChatSidebar = () => {
    return (
        <Card className="col-span-2">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            {/* <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" /> */}
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">Chat Sidebar</h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="max-h-[380px] min-h-[380px] px-3 py-0 text-small text-default-400">
          <div
            // key={message.id}
            className={`flex justify-start`}>
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