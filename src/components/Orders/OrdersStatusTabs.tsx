import {Tabs, Tab, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";

import DataTable from 'react-data-table-component';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { marinaChannel, marinaStatusColor } from "@/config/enum";
import { tokoStatus } from "@/config/tokopedia";
import { formatPrice } from "@/functions/price";

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
                {/* <label data-tag="allowRowEvents" style={productStyle}>
                    {row.id}
                </label> */}
                <div data-tag="allowRowEvents" style={greyStyle}>
                    {row.origin_id}
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
        <div style={{width: '-webkit-fill-available'}}>
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
            sortable: true,
            selector: (row:any) => (row.id),
            cell: (row:any) => <IdCell row={row}/>,
        },{
            name: 'Product(s)',
            // sortable: true,
            cell: (row:any) => <ProductCell row={row} />,
        },{
            name: 'Order Time',
            selector: (row:any) => row.createdAt,
            maxwidth: '600px',
            sortable: true,
            cell: (row:any) => <DateCell row={row} />,

        },{
            name: 'Store',
            sortable: true,
            selector: (row:any) => row.store.name,
        },{
            name: 'Status',
            cell: (row:any) => <StatusCell row={row}/>,
            sortable: true,
            selector: (row:any) => row.status,
        },{
            name: 'Order Amount',
            sortable: true,
            selector: (row:any) => `Rp ${formatPrice(row.total_amount)}`,
        },{
            name: 'Courier Service',
            sortable: true,
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
                    if (activeStatusTab == 'new') {
                        if (data.channel.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase()) {
                            return orders.status.toString().toLowerCase().includes('pending');
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tokopedia.toString().toLowerCase()) {
                            const condition = ['New', 'Created'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tiktok.toString().toLowerCase()) {
                            const condition = ['AWAITING_SHIPMENT', 'UNPAID', 'ON_HOLD'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        }
                    } else if (activeStatusTab == 'process') {
                        if (data.channel.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase())  {
                            const condition = ['ready_to_ship', 'ready_to_ship_pending', 'packed', 'repacked'];
                            return condition.some((el) => orders.status.toString().toLowerCase().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tokopedia.toString().toLowerCase()) {
                            const condition = ['Accepted'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tiktok.toString().toLowerCase()) {
                            const condition = ['PARTIALLY_SHIPPING', 'AWAITING_COLLECTION'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        }
                    } else if (activeStatusTab == 'delivery') {
                        if (data.channel.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase()) {
                            return orders.status.toString().toLowerCase().includes('shipped');
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tokopedia.toString().toLowerCase()) {
                            const condition = ['Wait for pickup', 'Shipped', 'Shipped - No AWB', 'Invalid AWB', 'AWB need correection'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tiktok.toString().toLowerCase()) {
                            const condition = ['IN_TRANSIT'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        }
                    } else if (activeStatusTab == 'completed') {
                        if (data.channel.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase()) {
                            const condition = ['delivered', 'completed', 'confirmed'];
                            return condition.some((el) => orders.status.toString().toLowerCase().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tokopedia.toString().toLowerCase()) {
                            const condition = ['Delivered to Pickup point', 'Delivered', 'Open Case to Finish Order', 'Order Finished'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tiktok.toString().toLowerCase()) {
                            const condition = ['DELIVERED', 'COMPLETED'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        }
                    } else if (activeStatusTab == 'canceled') {
                        if (data.channel.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase()) {
                            return orders.status.toString().toLowerCase().includes('canceled');
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tokopedia.toString().toLowerCase()) {
                            const condition = ['Cancelled', 'Rejected - OOS', 'Cancelled - Fraud', 'Rejected'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tiktok.toString().toLowerCase()) {
                            const condition = ['CANCELLED', 'CANCEL'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        }
                    } else if (activeStatusTab == 'failed') {
                        if (data.channel.toString().toLowerCase() == marinaChannel.Lazada.toString().toLowerCase()) {
                            const condition = ['failed_delivery', 'failed', 'lost_by_3pl', 'damaged_by_3pl'];
                            return condition.some((el) => orders.status.toString().toLowerCase().includes(el));
                        } else if (data.channel.toString().toLowerCase() == marinaChannel.Tokopedia.toString().toLowerCase()) {
                            const condition = ['Fraud Review'];
                            return condition.some((el) => orders.status.toString().includes(el));
                        }
                    }
                });
            }
            setTableData(filteredOrderes);
        }
    }, [activeStatusTab, data.currentData]);

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
            </Tab>
            )}
        </Tabs>
    );
}