export const createToko = (product:any) => {
    const basicInfo = product.basic;
    const pictureInfo = product.pictures[0];
    return {
            name: basicInfo.name,
            condition: basicInfo.condition,
            desc: basicInfo.shortDesc,
            origin_id: basicInfo.productID.toString(),
            price: product.price.value,
            shop_id: {
                connect: {
                    origin_id: basicInfo.shopID.toString()
                }
            },
            sku: product.other.sku,
            stock: product.stock.value,
            product_img: {
                create: {
                    filename: pictureInfo.fileName,
                    height: pictureInfo.height,
                    width: pictureInfo.width,
                    origin_id: pictureInfo.picID.toString(),
                    originalUrl: pictureInfo.OriginalURL,
                    status: pictureInfo.status.toString(),
                    thumbnailUrl: pictureInfo.ThumbnailURL
                }
            },
            status: basicInfo.status.toString(),
            weight:product.weight.value}
}