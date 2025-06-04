"use client";
import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
export const OrderedItems = (params:any) => {
    let itemOrdered = params.items;
    return (
        <>
        <Table fullWidth>
            <TableHeader>
                {/* <TableColumn>No</TableColumn> */}
                <TableColumn>SKU</TableColumn>
                <TableColumn>Product Name</TableColumn>
                <TableColumn>Qty</TableColumn>
                <TableColumn>Price</TableColumn>
            </TableHeader>
            <TableBody items={itemOrdered} emptyContent={"No rows to display."}>
            {(item:any) => (
                <TableRow className="cursor-pointer" key={item.id}>
                    {/* <TableCell>{item.id}</TableCell> */}
                    <TableCell>{(item.products.sku) ? item.products.sku : '-'}</TableCell>
                    <TableCell>
                        <Link isExternal showAnchorIcon 
                          href={`/products/${item.products.id}`}>
                            {item.products.name}
                        </Link>
                    </TableCell>
                    <TableCell>{item.qty}</TableCell>
                    {/* <TableCell>Rp {formatPrice(item.products.price)}</TableCell> */}
                    <TableCell>{item.products.price.toLocaleString('id-ID', { style: 'currency',  currency:(item.products.currency) ? item.products.currency : 'IDR'})}</TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </>
    )
}