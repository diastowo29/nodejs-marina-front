import { ModalBody } from "@nextui-org/react"
import { OrderedItems } from "../Tables/OrderedItems";

export const OrderContent = (params:any) => {
    const orderDetail = params.orderDetail;
    const orderItems = params.orderItems;
    return (
        <>
            <ModalBody>
                <p>{`Recipient address: ${orderDetail.recp_addr_full}, ${orderDetail.recp_addr_city}, ${orderDetail.recp_addr_country}`}</p>
                <p>{`Contact: ${orderDetail.recp_name} - ${orderDetail.recp_phone}`}</p>
                <OrderedItems items={orderItems} />
            </ModalBody>
        </>
    )
}