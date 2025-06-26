"use server";

import { Button } from "@nextui-org/react";
import Link from "next/link";

const modalMarketplace = (btn:any, newModal:boolean) => {
    /* if (newModal) {
        setNew(true);
    } else {
        setNew(false);
    }
    setMarketName(btn);
    onOpen(); */
}

export function ButtonGroup () {
    return (
        <>
           {/*  <Button disabled onClick={() => modalMarketplace('blibli', true)} className="bg-gradient-to-tr from-blue-400 to-sky-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add BliBli Store
            </Button>
            <Button onClick={() => modalMarketplace('tokopedia', true)} className="bg-gradient-to-tr from-lime-600 to-green-400 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                Add Tokopedia Store
            </Button>
            <Button className="bg-gradient-to-tr from-orange-500 to-orange-300 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
            <Link href={`${shopeeAuth}${shopeeAuthPath}?partner_id=${partnerId}&redirect=${marinaEnv().SHOPEE_REDIRECT_URL}settings/marketplace&timestamp=${ts}&sign=${shopeeSign}`}>
                Add Shopee Store
            </Link>
            </Button>
            <Button className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                <Link href={`${lazadaAuth}&redirect_uri=${callbackEndpoint}?app=chat&client_id=${process.env.NEXT_PUBLIC_LAZ_APP_CHAT_KEY_ID}`}>
                Add Lazada Store (Chat)
                </Link>
            </Button>
            <Button className="bg-gradient-to-tr from-blue-800 to-red-500 text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
                <Link href={`${lazadaAuth}&redirect_uri=${callbackEndpoint}?app=oms&client_id=${process.env.NEXT_PUBLIC_LAZ_APP_OMS_KEY_ID}`}>
                Add Lazada Store (Order)
                </Link>
            </Button>
            <Button className="bg-gradient-to-tr from-black to-white text-white shadow-lg" color="primary" variant="flat" size="md" startContent={<BliBliIcon/>}>
            <Link href={tiktokAuth}>
                Add TikTok Store
            </Link>
            </Button> */}

        </>
    )
}