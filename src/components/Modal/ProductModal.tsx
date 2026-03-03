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
                        alt={productDetail.name || "Product image"}
                        src={
                            // use source value from productDetail if available, otherwise fall back to generic not_found image
                            (productDetail?.product_img && productDetail.product_img.length > 0
                              ? productDetail.product_img[0].thumbnailUrl
                              : (productDetail?.source?.url || "/images/not_found/not_found.jpg"))
                        }
                        width={300} />
                    <div>
                        <p>{`SKU: ${productDetail.sku}`}</p>
                        <p>{`Price: Rp ${formatPrice(productDetail.price)}`}</p>
                        <p>{`Product URL: `}<a href={productDetail.url} target="_blank">Marketplace URL</a></p>
                        {/* <p>{`Condition: ${(conditions(productDetail.condition))}`}</p> */}
                        {/* <p>{(productDetail.desc) ?? '-'}</p> */}
                    </div>
                </div>
            </ModalBody>
        </>
    )
}