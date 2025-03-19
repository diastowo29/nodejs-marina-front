import { formatPrice } from "@/functions/price"
import { Card, CardBody, Image } from "@nextui-org/react"

export const ChatProductBubble = (params:any) => {
    let priceFixed = params.price;

    if (!isNaN(params.price)) {
        priceFixed = `Rp ${formatPrice(params.price)}`;
    } else {
        if (!params.price.includes('Rp')) {
            priceFixed = `Rp ${params.price}`;
        }
    }
    return (
        <Card isBlurred className="py-2">
            <CardBody className="overflow-visible py-2">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={params.image}
                        width={170}
                        />
                    </div>
                    <div className="relative col-span-6 md:col-span-4">
                        <p className="text-tiny uppercase font-bold">{params.name}</p>
                        <small className="text-default-500">{priceFixed}</small>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}