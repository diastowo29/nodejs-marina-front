import { formatPrice } from "@/functions/price"
import { Image, ModalBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

export const ProductContent = (params:any) => {
    const productDetail = params.productDetail;
    const conditions = (cond:number) => {
        return (cond == 2 ? 'Used' : 'New');
    }
    return (
        <>
            <ModalBody>
                <div className="grid grid-cols-3 gap-4">
                    <Image
                        alt="HeroUI hero Image with delay"
                        // height={200}
                        src="https://app.requestly.io/delay/5000/https://heroui.com/images/hero-card-complete.jpeg"
                        width={300}/>
                    <div>
                        <p>{`Rp ${formatPrice(productDetail.price)}`}</p>
                        <p>{`Condition: ${(conditions(productDetail.condition))}`}</p>
                        <p>{(productDetail.desc) ?? '-'}</p>
                    </div>
                </div>
            </ModalBody>
        </>
    )
}