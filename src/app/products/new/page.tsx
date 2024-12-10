'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewProductModal from "@/components/Modal/NewProductModal";
import ImageUpload from "@/components/Upload/ImageUpload";
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
import {useCallback, useEffect, useState, useRef} from "react";
import { useDropzone } from "react-dropzone";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

// export const metadata: Metadata = {   title: "Next.js Tables | TailAdmin -
// Next.js Dashboard Template",   description:     "This is Next.js Tables page
// for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template", };

const TablesPage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const divRef = useRef<HTMLDivElement | null>(null);
  console.log(divRef.current);
    return (
        <DefaultLayout>
            {/* <NewProductModal/> */}
            <Breadcrumb pageName="New Products"/>
            <div ref={divRef} id="2992131" className="grid grid-cols-1 gap-9 sm:grid-cols-2">
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
                            <ImageUpload/>
                                {/* <form action="/target" class="dropzone"></form> */}
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <Button onPress={onOpen}>Open Modal</Button>
                <Modal portalContainer={divRef.current}  style={{zIndex: 1000}} placement="center" size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <p> 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam pulvinar risus non risus hendrerit venenatis.
                            Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam pulvinar risus non risus hendrerit venenatis.
                            Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                            Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                            dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                            Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                            Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                            proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                            Action
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
                
            </div>
            
                
        </DefaultLayout>
    );
};

export default TablesPage;
