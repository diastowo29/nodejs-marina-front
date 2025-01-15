'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import {Tabs, Tab, Card, CardBody, CardHeader, select} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, Input, DropdownItem, Button} from "@nextui-org/react";
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import { products } from "@/data/tokopedia";

const statusColorMap:any = {
    Active: "success",
    'Out of stock': "danger",
    Inactive: "warning",
  };  

const TablesPage = () => {
    const [activeTab, setActiveTab] : any = useState();
    const [activeStatusTab, setActiveStatusTab] : any = useState();
    const [tableData, setTableData]: any[] = useState([]);
    const [modalData, setModalData]: any = useState({});
    const [loading, setLoading] = useState(false);
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [filterValue, setFilterValue] = useState("");
    const hasSearchFilter = Boolean(filterValue);
    const [page, setPage] = useState(1);
    // let productList:any[] = [];
    const productList = useRef([]);
    

    useEffect(() => {
        // Fetch data based on active tab
        
        const fetchData = async () => {
            setLoading(true);
            let data:any[] = [];
            let productApi = `/api/products?c=${activeTab}`;
            try {
                const response = await fetch(productApi);
                const productData = await response.json();
                data = productData;
                productList.current = productData;
            } catch (err) {
                console.log('Error getting orders data: ', err);
            }
            setTableData(data);
        };

        fetchData();
    }, [activeTab, activeStatusTab]);

    let tabs = [
        {
          id: "tokopedia",
          label: "Tokopedia"
        },
        {
          id: "Shopee",
          label: "Shopee"
        },
        {
          id: "BliBli",
          label: "BliBli"
        },
        {
          id: "Tiktok",
          label: "Tiktok"
        },
        {
          id: "Lazada",
          label: "Lazada"
        }
    ];

    const onSearchChange = useCallback((value:any) => {
        console.log(value)
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
            setFilterValue("");
        }
        let filteredProd = [...productList.current];
        filteredProd = filteredProd.filter((product:any) => 
            product.name.toString().toLowerCase().includes(value.toLowerCase())
        )
        setTableData(filteredProd);
      }, []);
    const onClear = useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

    const setSelectedInv = (itemId:any) => {
        console.log('')
    }

    const topContent = useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                // startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
          </div>
        );
      }, [
        filterValue,
        onSearchChange,
        hasSearchFilter,
      ]);
    return (
        <DefaultLayout>
        <Breadcrumb pageName="Products" />
            <Card>
                <CardBody>
                    {/* <p>Make beautiful websites regardless of your design experience.</p> */}
                    <div className="flex w-full flex-col">
                        <Tabs aria-label="Dynamic tabs" 
                            disabledKeys={["BliBli"]} 
                            // selectedKey={selected}
                            onSelectionChange={(tabKey) => setActiveTab(tabKey)}
                            items={tabs} 
                            isVertical={false}
                            /* className="max-w-40" */>
                            {(item) => (
                            <Tab key={item.id} title={item.label}>
                                <Table topContent={topContent} aria-label="Example empty table">
                                    <TableHeader>
                                        <TableColumn>Product(s)</TableColumn>
                                        <TableColumn>Date</TableColumn>
                                        <TableColumn>Store</TableColumn>
                                        <TableColumn>Status</TableColumn>
                                        <TableColumn>Price</TableColumn>
                                        <TableColumn>Stock</TableColumn>
                                        <TableColumn>Action</TableColumn>
                                    </TableHeader>
                                    {(tableData.length > 0) ? (
                                        <TableBody>
                                            {tableData.map((item:any) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <div className="flex gap-5">
                                                            <div>
                                                                {item.product_img.length>0 ? (
                                                                    <Avatar className="object-left" src={item.product_img[0].thumbnailUrl} />
                                                                ):(
                                                                    <Avatar className="object-left" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                {item.name}
                                                                <p className="text-default-400">SKU: {item.sku}</p>
                                                                {/* <p className="text-default-400">Invoice: {item.inv}</p> */}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{item.createdAt.split('T')[0]}</TableCell>
                                                    <TableCell>{item.shop_id.name}</TableCell>
                                                    {/* <TableCell>{item.status}</TableCell> */}
                                                    <TableCell>
                                                    <Chip className="capitalize" color={statusColorMap['Active']} size="sm" variant="flat">
                                                        {'Active'}
                                                    </Chip>
                                                    </TableCell>
                                                    <TableCell>{item.price}</TableCell>
                                                    <TableCell>{item.stock ? item.stock: 0}</TableCell>
                                                    {/* <TableCell><Button onPress={onOpen}>Open Modal</Button></TableCell> */}
                                                    <TableCell>
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button 
                                                                variant="bordered"
                                                                isIconOnly  
                                                                >
                                                                    {/* <dotsAction></dotsAction> */}
                                                                    <svg className="bi bi-three-dots-vertical" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu onAction={() => setSelectedInv(item.id)} aria-label="Static Actions">
                                                                {/* <DropdownItem onPress={onOpen} key="new">Edit</DropdownItem> */}
                                                                <DropdownItem key="copy"><Link href={`/products/${item.id}`}>Edit</Link></DropdownItem>
                                                                <DropdownItem key="delete" className="text-danger" color="danger">
                                                                Delete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    ) : (
                                        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                                    )} 
                                    
                                </Table>
                            </Tab>
                            )}
                            
                        </Tabs>
                        <div className="fixed bottom-4 right-4">
                            <Button color="success" /* endContent={<CameraIcon/>} */>
                                Add Product
                            </Button>
                            <Button onPress={() => syncStore()} color="success" /* endContent={<CameraIcon/>} */>
                                Sync
                            </Button>
                            {/* <Dropdown>
                                <DropdownTrigger>
                                    <Button 
                                    variant="bordered" 
                                    >
                                    Sync Product
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="all">All Channel</DropdownItem>
                                    <DropdownItem key="one">This Channel</DropdownItem>
                                </DropdownMenu>
                            </Dropdown> */}
                        </div>
                    </div>  
                </CardBody>
            </Card>
        </DefaultLayout>
    );
};

function syncStore () {
    console.log('heello');
}

export default TablesPage;
