import { formatPrice } from "@/functions/price"
import { ModalBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

export const OrderContent = (params:any) => {
    const orderDetail = params.orderDetail;
    const orderItems = params.orderItems;
    return (
        <>
            <ModalBody>
                <p>{`Recipient address: ${orderDetail.recp_addr_full}, ${orderDetail.recp_addr_city}, ${orderDetail.recp_addr_country}`}</p>
                <p>{`Contact: ${orderDetail.recp_name} - ${orderDetail.recp_phone}`}</p>
                <Table fullWidth>
                    <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>SKU</TableColumn>
                    <TableColumn>Product Name</TableColumn>
                    <TableColumn>Qty</TableColumn>
                    <TableColumn>Price</TableColumn>
                    </TableHeader>
                    <TableBody items={orderItems} emptyContent={"No rows to display."}>
                    {(item:any) => (
                        <TableRow className="cursor-pointer" key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.products.sku}</TableCell>
                        <TableCell>{item.products.name}</TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell>Rp {formatPrice(item.products.price)}</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </ModalBody>
        </>
    )
}