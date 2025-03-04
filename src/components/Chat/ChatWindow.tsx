import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Divider,
    Textarea,
    Button,
    Skeleton,
    Image
} from "@nextui-org/react";
import {useState, useEffect, useRef} from "react";
// import { CHAT_ENDPOINT } from "@/urls/internal";
// import io from 'socket.io-client';
import { marinaChannel, marinaChatContent } from "@/config/enum";
import { replyChat } from "@/app/actions/chat/actions";
// const socket = io('http://localhost:3000');

export const ChatWindow = (comments : any) => {
    const messagesEndRef = useRef(null);
    // console.log(comments.orderId);
    // console.log(comments);
    let newMessages = [];
    const isLazada = (comments.contacts.store.channel.name.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase()) ? true : false;
    // if (isLazada) {
      newMessages = comments.comments.map((comment : any) => {
        return {
          id: comment.id,
          chat_type: comment.chat_type,
          line_text: (comment.author === 'agent') ? comment.line_text: (isLazada) ? JSON.parse(comment.line_text).txt : comment.line_text,
          createdAt: new Date(comment.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),
          author: comment.author
        }
      });
    // }

    
    // console.log(newMessages);
    const [messages, setMessages] = useState(newMessages);
    // console.log(messages); setMessages(comments.comments);
    let msgId = '';
    // let omnichatId = ((comments.sample) ? 0 : comments.contacts.id);
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
        if (newMessage.length > 500)
            //   setError("Message exceeds 500 characters");
            return;
        
        // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        // const mathRandom = Math.floor(Math.random() * 90000) + 10000
        let contentType = marinaChatContent.TEXT;
        const newMsg = {
            id: msgId,
            line_text: newMessage,
            author: 'agent',
            createdAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
            omnichat_origin_id: comments.contacts.origin_id,
            store_origin_id: comments.contacts.store.origin_id,
            channel_name: comments.contacts.store.channel.name,
            last_messageId: comments.contacts.last_messageId,
            chat_type: contentType
        };
        setMessages([
            ...messages,
            newMsg
        ]);
        // console.log(comments);
        // console.log('calling endpoint: ', CHAT_ENDPOINT);
        // const newChatJson = await fetch(CHAT_ENDPOINT,{
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(newMsg)
        // });
        await replyChat(newMsg);
        // console.log(newChatJson);
        // const newChat = await newChatJson.json();
        // console.log(newChat);
        // messagesEndRef
        //         .current?.scrollIntoView({behaviour: 'smooth'})
        // const commentSection = document.getElementById('commentSection');
        // commentSection.scrollTop = (commentSection?.scrollHeight)+100;
        setNewMessage('');
        // setError(""); const newMsg = {   id: messages.length + 1,   text: newMessage,
        // sent: true,   timestamp: new Date().toLocaleTimeString([], { hour: "2-digit",
        // minute: "2-digit" }), }; setNewMessage("");
    };

    let inboundChat:any[] = [];
    
    const handleNewMessage = (data:any) => {
      // console.log(data);
      let bubble = JSON.parse(data);
      // console.log(bubble);
      if (!bubble.user_id) {
        return;
      }
      // console.log(bubble);
      if (bubble.user_id.toString() == comments.contacts.omnichat_user.origin_id) {
        const newMsg = {
            id: bubble.message_id,
            line_text: bubble.message.txt,
            author: 'end-user',
            createdAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        };
        let goPush = true;
        inboundChat.forEach((message:any) => {
          // console.log(message.id);
          // console.log(bubble.message_id);
          if (message.id == bubble.message_id) {
            goPush = false;
          }
        });
        console.log('gopush', goPush);
        if (goPush) {
          inboundChat.push(newMsg);
          setMessages((messages:any) => [
              ...messages,
              newMsg
          ]);
        }
        // console.log(inboundChat);
        // console.log(messages);
      } else {
        // CHAT FROM SOMEONE
        console.log(bubble.user_id.toString());
      }
    }

    useEffect(() => {
     /*  const socket = io('http://localhost:3000');
      // messagesEndRef.current?.scrollIntoView({behaviour: 'smooth'});
      socket.on('chatTokopedia', handleNewMessage);
      // socket.on('chatTokopedia', (data:any) => {
      //   console.log(data);
      // })
      socket.disconnect();
      // return() => socket.disconnect(); */

      const events = new EventSource('http://localhost:3002/api/v1/lazada/chat/events');
      events.onmessage = (event) => {
        // console.log('get events');
        console.log(event);
        handleNewMessage(event.data);
        // const parsedData = JSON.parse(event.data);
        // setFacts((facts) => facts.concat(parsedData));
      };

    }, []);

    if (comments.loading) {
      // console.log('loading');
      return (
        <Card className="col-span-4">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Skeleton className="rounded-lg">
                    <Avatar
                        isBordered
                        radius="full"
                        size="md"/>
                  </Skeleton>
                </div>
            </CardHeader>
            <Divider className="mb-4"/>
            <CardBody
                id="commentSection"
                className="max-h-[380px] min-h-[380px] px-3 py-0 text-small text-default-400">
                  <div>
                    <p>Let&apos;s have a chat..</p>
                    <p>Select one of the contact list on the left</p>
                  </div>
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
      )
    }
    return (
        <Card className="col-span-4 h-fit">
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
                className="max-h-[480px] min-h-[380px] px-3 py-0 text-small text-default-400">
                  {comments.sample ?
                    <div
                    // id={messages[0].id}
                    // key={messages[0].id}
                    // className={`mb-1 flex ${messages[0].author != 'end-user'
                            // ? "justify-end"
                            // : "justify-start"}`}
                            >
                      <Skeleton>
                        <div
                            className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg text-white`}>
                            {/* <p>{messages[0].line_text}</p> */}
                            {/* <p className="text-xs mt-1 text-stone-300">{messages[0].createdAt}</p> */}
                        </div>
                      </Skeleton> 
                  </div> :
                  (
                    <>
                    {
                      messages.map((message : any) => {
                        let bubble = (<p>{message.line_text}</p>);
                        let chatType  = message.chat_type.toString().toLowerCase();
                        if (chatType == marinaChatContent.PRODUCT) {
                          let product = JSON.parse(message.line_text).product;
                          bubble = (
                            <Card className="py-4">
                              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{product.name}</p>
                                <small className="text-default-500">{product.price}</small>
                                {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
                              </CardHeader>
                              <CardBody className="overflow-visible py-2">
                                <Image
                                  alt="Card background"
                                  className="object-cover rounded-xl"
                                  src={product.image_url}
                                  width={170}
                                />
                              </CardBody>
                            </Card>
                          )
                        } else if (chatType == marinaChatContent.INVOICE) {

                        }
                        // console.log(message)
                        return (
                      <div id={message.id} key={message.id}
                      className={`mb-1 flex ${message.author == 'agent'
                          ? "justify-end"
                          : "justify-start"}`}>
                            <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg  ${message.author == 'agent' ? 'bg-zinc-600' : 'bg-blue-500'} text-white`}>
                              {bubble}
                              <p className="text-xs mt-1 text-stone-300">{message.createdAt}</p>
                            </div>
                      </div>
                          )})
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