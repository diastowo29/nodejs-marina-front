"use client";
import { popToast } from "@/app/actions/toast/pop";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useState } from "react";

interface orderBtnProps {
    orderId: string;
    status:string;
}

const OrderButton = (props: orderBtnProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // console.log(props.status);

    // const { user, error, isLoading } = useUser();
    // console.log(user);
    // if (!isLoading) {
    //     console.log(user)
    // }
    const [reason, setReason] = useState('');
    const submitReject = (reason:string, orderId:string) => {
        console.log('reject: %s orderId: %s', reason, orderId)
        // THEN CALL TOKOPEDIA REJECT API HERE
        // console.log(user);
        setReason('');
    }

    const updateOrders = (orderId:string) => {
        console.log('update: ', orderId);
        // THEN CALL TOKOPEDIA REJECT API
    }

    const chatCustomer = (orderId:string) => {
        console.log('update: ', orderId);
        popToast('Chat customer', 'success');
    }

    return (
        <>      
            {/* <ToastProvider placement="top-right" toastOffset={160} /> */}
            <Button className="flex justify-center rounded bg-info px-6 py-2 font-medium text-black hover:bg-opacity-90" type="submit" 
            onClick={() => chatCustomer(props.orderId)}
            >
                Chat Customer
            </Button>
            
            <Button onPress={onOpen} className="flex justify-center rounded bg-warning px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                Reject
            </Button>
            
            <Button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit" 
            onClick={() => updateOrders(props.orderId)} >
                Process
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Reject Form</ModalHeader>
                    <ModalBody>
                    <Input
                        autoFocus
                        label="Reason"
                        placeholder="Enter rejection reason"
                        onValueChange={setReason}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPressStart={() => submitReject(reason, props.orderId)} onPress={onClose}>
                        Submit
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default OrderButton;