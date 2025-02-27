import {Tabs, Tab, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";

import DataTable from 'react-data-table-component';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { marinaChannel, marinaStatusColor } from "@/config/enum";
import { tokoStatus } from "@/config/tokopedia";

export const OrdersStatusTabs = (data:any) => {
    const [tableData, setTableData] = useState(data.currentData);
    const [activeStatusTab, setActiveStatusTab] : any = useState();

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const ExpandedComponent = ({ data }:any) => {
        return (
            <div>
                {data.order_items.map((order:any) => {
                    return (<label>{order.id}</label>)
                })}
            </div>
        )
    }

    let greyStyle = { 
        color: 'grey', 
        overflow: 'hidden', 
        whiteSpace: 'wrap', 
        textOverflow: 'ellipses' 
    };
    let productStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxwidth: '60%',
        display: 'flow'
    };
    const DateCell = ({ row }:any) => (
        <div>
            <div>
                <label data-tag="allowRowEvents" style={greyStyle}>
                    {new Date(row.createdAt).toLocaleDateString()}
                </label>
                <div data-tag="allowRowEvents" style={greyStyle}>
                    {new Date(row.createdAt).toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
    const IdCell = ({ row }:any) => (
        <div>
            <div>
                <label data-tag="allowRowEvents" style={productStyle}>
                    {row.id}

                </label>
                <div data-tag="allowRowEvents" style={greyStyle}>
                    Source ID: {row.origin_id}
                </div>
            </div>
        </div>
    );
    
      const statusColor = (status:any) => {
        switch (status) {
          case 'pending':
            return marinaStatusColor.BLUE;
          case 'completed':
            return marinaStatusColor.GREEN;
          case 'confirmed':
            return marinaStatusColor.GREEN;
          case 'cancelled':
            return marinaStatusColor.YELLOW;
          default:
            return 'default';
        }
      }
    const StatusCell = ({ row }:any) => {
        if (!isNaN(row.status)) {
            row['status'] = tokoStatus(Number.parseInt(row.status))
        }
        return (
        <div>
            <div>
                <Chip color={statusColor(row.status)}>{row.status}</Chip>
            </div>
        </div>
    )};

    const ProductCell = ({ row }:any) => (
        <div>
            <div>
                <label data-tag="allowRowEvents" style={productStyle}>
                    {row.order_items[0].products.name}
                </label>
                <div data-tag="allowRowEvents" style={greyStyle}>
                    SKU: {row.order_items[0].products.sku}
                </div>
            </div>
        </div>
    );

    const dtTable_columns = [
        {
            name: 'ID',
            maxwidth: '75px',
            // sortable: true,
            cell: (row:any) => <IdCell row={row}/>,
        },{
            name: 'Product(s)',
            maxwidth: '100%',
            cell: (row:any) => <ProductCell row={row} />,
            // selector: (row:any) => row.order_items[0].products.name,
        },{
            name: 'Order Time',
            selector: (row:any) => row.createdAt,
            maxwidth: '600px',
            sortable: true,
            cell: (row:any) => <DateCell row={row} />,

        },{
            name: 'Store',
            selector: (row:any) => row.store.name,
        },{
            name: 'Status',
            cell: (row:any) => <StatusCell row={row}/>
            // selector: (row:any) => row.status,
        },{
            name: 'Order Amount',
            selector: (row:any) => row.total_amount,
        },{
            name: 'Courier Service',
            selector: (row:any) => row.logistic.name,
        },
    ];
       
    let statusTabs = [
        { id: "all", label: "All" },
        { id: "new", label: "New" },
        { id: "process", label: "On Process" },
        { id: "delivery", label: "Delivery" },
        { id: "completed", label: "Completed" },
        { id: "canceled", label: "Canceled" },
        { id: "failed", label: "Failed" }
    ];

    useEffect(() => {
        let filteredOrderes = data.currentData;
        // router.push(`${pathname}?${params}&s=${activeStatusTab}`);
        if (activeStatusTab) {
            if (activeStatusTab == 'all') {
                filteredOrderes = data.currentData;
            } else {
                filteredOrderes = filteredOrderes.filter((orders:any) => {
                    if (data.channel.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase()) {
                        if (activeStatusTab == 'new') {
                            return orders.status.toString().toLowerCase().includes('pending');
                        } else if (activeStatusTab == 'process') {
                            const condition = ['ready_to_ship', 'ready_to_ship_pending', 'packed', 'repacked'];
                            return condition.some((el) => orders.status.toString().toLowerCase().includes(el));
                        } else if (activeStatusTab == 'delivery') {
                            return orders.status.toString().toLowerCase().includes('shipped');
                        } else if (activeStatusTab == 'completed') {
                            const condition = ['delivered', 'completed', 'confirmed'];
                            return condition.some((el) => orders.status.toString().toLowerCase().includes(el));
                        } else if (activeStatusTab == 'canceled') {
                            return orders.status.toString().toLowerCase().includes('canceled');
                        } else if (activeStatusTab == 'failed') {
                            const condition = ['failed_delivery', 'failed', 'lost_by_3pl', 'damaged_by_3pl'];
                            return condition.some((el) => orders.status.toString().toLowerCase().includes(el));
                        }
                    }
                });
            }
            setTableData(filteredOrderes);
        }
    }, [activeStatusTab, data.currentData]);

    // useEffect(() => {
    //     console.log(page);
    // }, [page])

    /* const pages = Math.ceil(tableData.length / rowsPerPage);
    const bottonContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
                />
            </div>
        )
    }, [page, pages]) 
    
    const renderTable = (data:any) => {
        return data.map((item:any) => (
            <TableRow key={item.invoice}>
                <TableCell>
                    <Link href={'/orders/' + item.id}>
                        {item.order_items[0].products.name}
                        <p className="text-default-400">SKU: {item.order_items[0].products.sku} x {item.order_items[0].qty}</p>
                        <p className="text-default-400">Invoice: {item.invoice ? item.invoice : item.origin_id}</p>
                    </Link>
                </TableCell>
                <TableCell>{item.createdAt.split('T')[0]}</TableCell>
                <TableCell>{item.store.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.total_amount}</TableCell>
                <TableCell>{item.logistic.name}</TableCell>
                <TableCell>
                    {<Dropdown>
                        <DropdownTrigger>
                            <Button 
                            variant="bordered"
                            isIconOnly  
                            >
                                <svg className="bi bi-three-dots-vertical" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new">View</DropdownItem>
                            <DropdownItem key="copy"><Link href={"/orders/" + item.id}>Process</Link></DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                            Reject
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>}
                </TableCell>
            </TableRow>
        ))
    } */

    const orderSelected = (row:any) => {
        router.push(`/orders/${row.id}`);
    }

    return (
        <Tabs aria-label="Options" /* onSelectionChange={onStatusChange} */ onSelectionChange={(statusKey) => setActiveStatusTab(statusKey)} fullWidth={true} items={statusTabs}>
            {(item) => (
            <Tab key={item.id} title={item.label}>
                <DataTable
                    columns={dtTable_columns}
                    data={tableData}
                    pointerOnHover
                    pagination
                    onRowClicked={orderSelected}
                    // expandableRows
                    // expandableRowsComponent={ExpandedComponent}
                />
                    {/* <Table id="tablexxx" aria-label="Example empty table" 
                    bottomContent={bottonContent}
                    bottomContentPlacement="outside">
                        <TableHeader>
                            <TableColumn>Product(s)</TableColumn>
                            <TableColumn>Date</TableColumn>
                            <TableColumn>Store</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Total Amount</TableColumn>
                            <TableColumn>Courier</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        {(tableData.length > 0) ? (
                            <TableBody>
                                {renderTable(tableData)}
                            </TableBody>
                        ) : (
                            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                        )}
                    </Table> */}
            </Tab>
            )}
        </Tabs>
    );
}