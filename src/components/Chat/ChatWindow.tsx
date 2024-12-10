import {
    Card,
    CardHeader,
    Input,
    CardBody,
    CardFooter,
    Avatar,
    Divider,
    Textarea,
    Button,
    Skeleton
} from "@nextui-org/react";
import {useState, useEffect, useRef} from "react";
import { REPLY_CHAT } from "@/urls/internal";
import io from 'socket.io-client';
// const socket = io('http://localhost:3000');

export const ChatWindow = (comments : any) => {
    const messagesEndRef = useRef(null);
    console.log(comments);
    const [messages, setMessages] = useState(comments.comments);
    // console.log(messages);
    
    // console.log(messages); setMessages(comments.comments);
    let msgId = '';
    let omnichatId = ((comments.sample) ? 0 : comments.contacts.id);
    comments
        .comments
        .forEach((comment : any) => {
            if (comment.author == 'end-user') {
                msgId = comment.origin_id;
            }
        });
    const [newMessage, setNewMessage] = useState("");
    const handleSendMessage = async () => {
        // console.log(msgId);
        if (newMessage.trim() === "") 
            return;
        if (newMessage.length > 500) {
            //   setError("Message exceeds 500 characters");
            return;
        }
        // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        const mathRandom = Math.floor(Math.random() * 90000) + 10000
        const newMsg = {
            id: msgId,
            line_text: newMessage,
            author: 'agent',
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
            omnichatId: omnichatId,
            channel_id: comments.contacts.store.channel.id,
            shop_id: comments.contacts.store.origin_id
        };
        setMessages([
            ...messages,
            newMsg
        ]);
        const newChatJson = await fetch(REPLY_CHAT(),{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMsg)
        });
        const newChat = await newChatJson.json();
        console.log(newChat);
        messagesEndRef
                .current?.scrollIntoView({behaviour: 'smooth'})
        // const commentSection = document.getElementById('commentSection');
        // commentSection.scrollTop = (commentSection?.scrollHeight)+100;
        setNewMessage('');
        // setError(""); const newMsg = {   id: messages.length + 1,   text: newMessage,
        // sent: true,   timestamp: new Date().toLocaleTimeString([], { hour: "2-digit",
        // minute: "2-digit" }), }; setNewMessage("");
    };
    useEffect(() => {
      const socket = io('http://localhost:3000');
      messagesEndRef.current?.scrollIntoView({behaviour: 'smooth'});
      socket.on('chatTokopedia', handleNewMessage);
      // socket.on('chatTokopedia', (data:any) => {
      //   console.log(data);
      // })
      return() => socket.disconnect();
    }, []);

    const handleNewMessage = (data:any) => {
      console.log(data);
        // setMessages(comments.comments);
        // const newChat = JSON.parse(data);
        // console.log(newChat.message);
        if (data.user_id.toString() == comments.contacts.omnichat_user.origin_id) {
          const newMsg = {
              id: Math.floor(Math.random() * 90000) + 10000,
              line_text: data.message,
              author: 'end-user',
              timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
              })
          };
          setMessages((messages:any) => [
              ...messages,
              newMsg
          ]);
        } else {
          console.log(data.user_id.toString());
        }
    }
    return (
        <Card className="col-span-3">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                  {comments.sample ? 
                  <Skeleton className="rounded-lg">
                  <Avatar
                      isBordered={true}
                      radius="full"
                      size="md"
                      src={comments.contacts.omnichat_user.thumbnailUrl}/>
                </Skeleton> :
                <Avatar
                    isBordered={true}
                    radius="full"
                    size="md"
                    src={comments.contacts.omnichat_user.thumbnailUrl}/>
                  }
                  
                    <div className="flex flex-col gap-1 items-start justify-center">
                      {comments.sample ? 
                      <Skeleton>
                        <h4 className="text-small font-semibold leading-none text-default-600">{comments.contacts.omnichat_user.username}</h4>
                        <h4 className="text-small font-semibold leading-none text-stone-400">{comments.contacts.store.channel.name}</h4>
                      </Skeleton> : 
                      (
                        <>
                          <h4 className="text-small font-semibold leading-none text-default-600">{comments.contacts.omnichat_user.username}</h4>
                          <h4 className="text-small font-semibold leading-none text-stone-400">{comments.contacts.store.channel.name}</h4>
                        </>
                      )
                      }
                    </div>
                </div>
            </CardHeader>
            <Divider className="mb-4"/>
            <CardBody
                id="commentSection"
                className="max-h-[380px] min-h-[380px] px-3 py-0 text-small text-default-400">
                  {comments.sample ?
                    <div
                    id={messages[0].id}
                    key={messages[0].id}
                    className={`mb-1 flex ${messages[0].author != 'end-user'
                            ? "justify-end"
                            : "justify-start"}`}>
                      <Skeleton>
                        <div
                            className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg  ${messages[0].author != 'end-user' ? 'bg-zinc-600' : 'bg-blue-500'} text-white`}>
                            <p>{messages[0].line_text}</p>
                            <p className="text-xs mt-1 text-stone-300">{messages[0].createdAt}</p>
                        </div>
                      </Skeleton> 
                  </div> :
                  (
                    <>
                    {
                      messages.map((message : any) => (
                      <div
                      id={message.id}
                      key={message.id}
                      className={`mb-1 flex ${message.author != 'end-user'
                          ? "justify-end"
                          : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg  ${message.author != 'end-user' ? 'bg-zinc-600' : 'bg-blue-500'} text-white`}>
                          <p>{message.line_text}</p>
                          <p className="text-xs mt-1 text-stone-300">{message.createdAt}</p>
                        </div>
                      </div>
                          ))
                    }
                    <div style={{marginBottom: 50 }} ref={messagesEndRef}/>
                    </>
                  )
                }
            </CardBody>
            <Divider className="mt-4"/>
            <CardFooter className="grid grid-cols-4 gap-2">
                <Textarea
                    label="Enter message"
                    minRows={2}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter your message"
                    className="col-span-3"/>
                <Button size="md" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </CardFooter>
        </Card>
    )
}