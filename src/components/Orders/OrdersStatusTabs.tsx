import Link from "next/link";
import {Tabs, Tab, Card, CardBody, Pagination} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

// import DataTable from 'datatables.net-react';
// import 'datatables.net-buttons-dt';
// import 'datatables.net-responsive-dt';

// import DT from 'datatables.net-dt';
// import DT from 'datatables.net-bs5';

import DataTable from 'react-data-table-component';
import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export const OrdersStatusTabs = (currentData:any) => {
    const [tableData, setTableData] = useState(currentData.currentData);
    const [activeStatusTab, setActiveStatusTab] : any = useState();
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [page, setPage] = useState(1);

    const router = useRouter();
    const ExpandedComponent = ({ data }:any) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    
    // DataTable.use(DT);
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

    const ProductCell = ({ row }:any) => (
        <div>
            <div>
                <label data-tag="allowRowEvents" style={productStyle}>
                    {row.order_items[0].products.name}
                </label>
                <div data-tag="allowRowEvents" style={greyStyle}>
                    Original ID: {row.origin_id}
                </div>
                <div data-tag="allowRowEvents" style={greyStyle}>
                    SKU: {row.order_items[0].products.sku}
                </div>
            </div>
        </div>
    );

    const dtTable_columns = [
        {
            name: 'ID',
            maxWidth: '75px',
            sortable: true,
            selector: (row:any) => row.id,
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
            selector: (row:any) => row.status,
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
        let filteredOrderes = currentData.currentData;
        if (activeStatusTab) {
            if (activeStatusTab == 'all') {
                filteredOrderes = currentData.currentData;
            } else {
                filteredOrderes = filteredOrderes.filter((orders:any) => 
                    orders.status.toString().toLowerCase().includes(activeStatusTab.toLowerCase())
                );
            }
            // const start = (page - 1) * rowsPerPage;
            // const end = start + rowsPerPage;
            
            setTableData(filteredOrderes);
        }
    }, [activeStatusTab, currentData.currentData]);

    useEffect(() => {
        console.log(page);
    }, [page])

    const pages = Math.ceil(tableData.length / rowsPerPage);
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
    }

    const orderSelected = (row:any) => {
        console.log(row.id);
        // redirect(`/orders/${row.id}`)
        router.push(`/orders/${row.id}`);
    }

    return (
        <Tabs aria-label="Options" /* onSelectionChange={onStatusChange} */ onSelectionChange={(statusKey) => setActiveStatusTab(statusKey)} fullWidth={true} items={statusTabs}>
            {(item) => (
            <Tab key={item.id} title={item.label}>
                <DataTable
                    columns={dtTable_columns}
                    data={tableData}
                    // expandableRows
                    pagination
                    onRowClicked={orderSelected}
                    // expandableRowsComponent={ExpandedComponent}
                />
                {/* <DataTable data={tableData} className="display table" columns={columns}>
                    <thead>
                        <tr>
                            <th>Product(s)</th>
                            <th>Order Date</th>
                            <th>Store</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th>Courier</th>
                        </tr>
                    </thead>
                </DataTable> */}
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