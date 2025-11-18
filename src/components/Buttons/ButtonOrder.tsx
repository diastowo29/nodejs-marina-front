"use client";
import { updateOrder } from "@/app/actions/order/actions";
import { popToast } from "@/app/actions/toast/pop";
import { cancelReasons } from "@/config/enum";
import { localStrings } from "@/config/local_strings";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Select, SelectItem} from "@nextui-org/react";
import { useState } from "react";

interface orderBtnProps {
    orderId: string;
    status:string;
    channel:string;
}

const OrderButton = (props: orderBtnProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [onCalling, setOnCalling] = useState(false);
    // const { user, error, isLoading } = useUser();
    // console.log(user);
    // if (!isLoading) {
    //     console.log(user)
    // }
    // console.log(props);
    const [selectedReason, setSelectedReason] = useState('');
    console.log(props);
    const reasons = cancelReasons(props.channel, props.status);
    const submitReject = async (orderId:string) => {
        setOnCalling(true);
        const jsonPayload = {
            action: switchLabelReject(props.status).action,
            cancel_reason: selectedReason
        }
        const orderUpdated = await updateOrder(orderId, jsonPayload);
        setOnCalling(false);
        if (orderUpdated.status !== 200) {
            console.log(orderUpdated);
            popToast(localStrings.message.orderUpdateFailed, 'error');
        } else {
            if (orderUpdated.data.order.code == 0) {
                popToast(localStrings.message.orderUpdateSuccess, 'success');
            } else {
                popToast(orderUpdated.data.order.response.message, 'error');
            }
        }
    }

    const updateOrdersMenu = async (orderId:string, key:string) => {
        let jsonPayload = {};
        let orderUpdated;
        switch (key) {
            case 'cancel':
                onOpen();
                break;
            /* case 'reject':
                setOnCalling(true);
                jsonPayload = {
                    action: "reject"
                }
                orderUpdated = await updateOrder(orderId, jsonPayload);
                setOnCalling(false);
                if (orderUpdated.status !== 200) {
                    console.log(orderUpdated);
                    popToast(localStrings.message.orderUpdateFailed, 'error');
                } else {
                    if (orderUpdated.data.order.code == 0) {
                        popToast(localStrings.message.orderUpdateSuccess, 'success');
                    } else {
                        popToast(orderUpdated.data.order.response.message, 'error');
                    }
                }
                return; */
            case 'chat':
                console.log('chat');
                break;
            case 'process':
                setOnCalling(true);
                jsonPayload = {
                    action: switchLabelProceed(props.status).action
                }
                orderUpdated = await updateOrder(orderId, jsonPayload);
                setOnCalling(false);
                if (orderUpdated.status !== 200) {
                    console.log(orderUpdated);
                    popToast(localStrings.message.orderUpdateFailed, 'error');
                } else {
                    if (orderUpdated.data.order.code == 0) {
                        popToast(localStrings.message.orderUpdateSuccess, 'success');
                    } else {
                        popToast(orderUpdated.data.order.response.message, 'error');
                    }
                }
                return;
            default:
                break;
        }
    }

    const switchLabelProceed = (status:string) => {
        let label = '';
        let disabled = false;
        let desc = '';
        let action = '';
        // console.log(status);
        switch (status) {
            case 'AWAITING_SHIPMENT':
                label =  localStrings.btn.order.label.process;
                disabled = false;
                desc = localStrings.btn.order.desc.process;
                action = 'process';
                break;
            case 'ORDER_REQUEST_CANCEL':
                label =  localStrings.btn.order.label.approve_cancel;
                disabled = false;
                desc = localStrings.btn.order.desc.approve_cancel;
                action = 'approve';
                break;
            case 'ORDER_REFUND':
                label =  localStrings.btn.order.label.approve_cancel;
                disabled = false;
                desc = localStrings.btn.order.desc.approve_cancel;
                action = 'approve_rr';
                break;
            case 'CANCEL':
                label = localStrings.btn.order.label.process;
                disabled = true;
                desc = localStrings.btn.order.desc.process;
                break;
            default:
                label =  localStrings.btn.order.label.process;
                disabled = true;
                desc = localStrings.btn.order.desc.process;
                break;
        }
        return {
            label: label,
            disabled: disabled,
            desc: desc,
            action: action
        }
    }

    const switchLabelReject = (status:string) => {
        let label = '';
        let disabled = false;
        let desc = '';
        let action = '';
        switch (status) {
            case 'AWAITING_SHIPMENT':
                label = localStrings.btn.order.label.reject;
                disabled = false;
                desc = localStrings.btn.order.desc.reject;
                action = 'cancel';
                break;
            case 'ORDER_REQUEST_CANCEL':
                label = localStrings.btn.order.label.reject_cancel;
                disabled = false;
                desc = localStrings.btn.order.desc.reject_cancel;
                action = 'reject';
                break;
            case 'ORDER_REFUND':
                label = localStrings.btn.order.label.reject_cancel;
                disabled = false;
                desc = localStrings.btn.order.desc.reject_cancel;
                action = 'reject_rr';
                break;
            case 'CANCEL':
                label = localStrings.btn.order.label.reject;
                disabled = true;
                desc = localStrings.btn.order.desc.reject;
                break;
            default:
                label = localStrings.btn.order.label.reject;
                disabled = true;
                desc = localStrings.btn.order.desc.reject;
                break;
        }
        return {
            label: label,
            disabled: disabled,
            desc: desc,
            action: action
        }
    }
    
    const items: Array<{
            key: string;
            label: string;
            divider: boolean;
            color: "success" | "warning" | "default" | "danger" | "primary" | "secondary" | undefined;
            desc: string;
            disabled?: boolean;
        }> = [
            {
                key: "chat",
                label: localStrings.btn.order.label.chat,
                divider: false,
                color: 'default',
                desc: localStrings.btn.order.desc.chat
            },
            {
                key: 'process',
                label: switchLabelProceed(props.status).label,
                divider: true,
                color: 'default',
                disabled: switchLabelProceed(props.status).disabled,
                desc: switchLabelProceed(props.status).desc
            },
            {
                key: "cancel",
                label: switchLabelReject(props.status).label,
                divider: false,
                color: 'danger',
                disabled: switchLabelReject(props.status).disabled,
                desc: switchLabelReject(props.status).desc
            }
        ];

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button isLoading={onCalling} variant="bordered">Action</Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key) => updateOrdersMenu(props.orderId, key as string)} aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem
                    key={item.key}
                    className={item.color === "danger" ? "text-danger" : ""}
                    color={item.color}
                    showDivider={item.divider}
                    isDisabled={item.disabled}
                    description={item.desc}
                    >
                    {item.label}
                    </DropdownItem>
                )}
                </DropdownMenu>
            </Dropdown>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Cancellation Form</ModalHeader>
                    <ModalBody>
                        <Select fullWidth onSelectionChange={(keys) => setSelectedReason(keys.anchorKey as string)} className="max-w-xs" label="Select a reason">
                            {reasons.map((cancelReason) => (
                            <SelectItem key={cancelReason.key}>{cancelReason.label}</SelectItem>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button isLoading={onCalling} color="primary" onPressStart={() => submitReject(props.orderId)} onPress={onClose}>
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