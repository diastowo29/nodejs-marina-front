import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewProductModal from "@/components/Modal/NewProductModal";
import { INT_GET_PRODUCT } from "@/urls/internal";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
    Input,
    Textarea,
    RadioGroup,
    Radio
} from "@nextui-org/react";
import {useRef, useState} from "react";

// export const metadata: Metadata = {   title: "Next.js Tables | TailAdmin -
// Next.js Dashboard Template",   description:     "This is Next.js Tables page
// for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template", };

const TablesPage = async ({ params }: { params: { product: string } }) => {
    // const productRef = useRef();
    console.log(params.product);
    let data:any = {};
    try {
        const res = await fetch(INT_GET_PRODUCT(params.product));
        data = await res.json();
        // productRef.current = data;
      } catch (err) {
        console.log(err);
      }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Products"/>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div
                        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark ">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Product Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div className="grid gap-4">
                                <Input
                                    type="text"
                                    label="Product Name"
                                    value={data.name}
                                    description="Minimum 25 characters. Name cannot be changed after product sold"
                                    className="max-w-full"/>
                                <Input
                                    type="text"
                                    label="Category"
                                    className="max-w-full"/>
                                <Textarea
                                label="Description"
                                placeholder="Enter your description"
                                description="Minimum 260 characters."
                                value={data.desc}
                                className="max-w-full"/>
                                <RadioGroup
                                label="Condition"
                                orientation="horizontal">
                                    <Radio value="buenos-aires">New</Radio>
                                    <Radio value="sydney">Used</Radio>
                                </RadioGroup>
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Input
                                    type="number"
                                    label="Dimension"
                                    placeholder="10"
                                    labelPlacement="outside"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">cm</span>
                                        </div>
                                    }
                                    />
                                    <Input
                                    type="number"
                                    label=" "
                                    placeholder="10"
                                    labelPlacement="outside"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">cm</span>
                                        </div>
                                    }
                                    />
                                    <Input
                                    type="number"
                                    label=" "
                                    placeholder="10"
                                    labelPlacement="outside"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">cm</span>
                                        </div>
                                    }
                                    />
                                </div>
                                <RadioGroup
                                label="Shipping Insurance"
                                orientation="horizontal">
                                    <Radio value="buenos-aires">Required</Radio>
                                    <Radio value="sydney">Optional</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div
                        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark ">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Product Photo
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div className="grid gap-4">
                                <form action="/target" className="dropzone"></form>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </DefaultLayout>
    );
};

export default TablesPage;
