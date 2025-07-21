"use client";
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

interface ProductsProps {
    productsList: {}[];
}

const statusColorMap:any = {
    Active: "success",
    'Out of stock': "danger",
    Inactive: "warning",
};
const setSelectedInv = (itemId:any) => {
    console.log(itemId)
}


export const ProductsTable = ({productsList}: ProductsProps) => {
    const [tableData, setTableData] = useState([...productsList]);
    const [filterValue, setFilterValue] = useState<string>();
    const hasSearchFilter = Boolean(filterValue);
    const onClear = useCallback(()=>{
        setFilterValue("")
        // setPage(1)
    },[]);
    console.log('productsTable: ', tableData.length);
    const onSearchChange = useCallback((value:any) => {
        console.log(value)
        if (value) {
          setFilterValue(value);
        //   setPage(1);
        } else {
            setFilterValue("");
        }
        let filteredProd = [...productsList];
        filteredProd = filteredProd.filter((product:any) => 
            product.name.toString().toLowerCase().includes(value.toLowerCase())
        )
        setTableData(filteredProd);
      }, []);
    const seachContent = useMemo(() => {
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
                    onValueChange={onSearchChange} />
                </div>
            </div>
        );
        }, [
        filterValue,
        onSearchChange,
        hasSearchFilter,
    ]);
    return (
        <Table topContent={seachContent}>
            <TableHeader>
                <TableColumn>Product(s)</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Store</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Stock</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            {(productsList.length > 0) ? (
                <TableBody>
                    {productsList.map((product:any) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {/* <Link href={`/products/${product.id}`}> */}
                                    <div className="flex gap-5">
                                        <div>
                                            {product.product_img.length>0 ? (
                                                <Avatar className="object-left" src={product.product_img[0].thumbnailUrl} />
                                            ):(
                                                <Avatar className="object-left" />
                                            )}
                                        </div>
                                        <div>
                                            {product.name}
                                            <p className="text-default-400">SKU: {product.sku}</p>
                                        </div>
                                    </div>
                                {/* </Link> */}
                            </TableCell>
                            <TableCell>{product.createdAt.split('T')[0]}</TableCell>
                            <TableCell>{product.store.name}</TableCell>
                            <TableCell>
                            <Chip className="capitalize" color={statusColorMap['Active']} size="sm" variant="flat">
                                {'Active'}
                            </Chip>
                            </TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.stock ? product.stock: 0}</TableCell>
                            <TableCell>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button 
                                        variant="bordered"
                                        isIconOnly  
                                        >
                                            <svg className="bi bi-three-dots-vertical" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu onAction={() => setSelectedInv(product.id)} aria-label="Static Actions">
                                        <DropdownItem isDisabled key="copy"><Link href={`/products/${product.id}`}>Edit</Link></DropdownItem>
                                        <DropdownItem isDisabled key="delete" className="text-danger" color="danger">
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
        
    )
}