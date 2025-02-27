const toko_host = 'https://fs.tokopedia.net'
const toko_shopinfo = `${toko_host}/v1/shop/fs/18229/shop-info?page=1&per_page=10`

function toko_gettoken () {
    return  `https://accounts.tokopedia.com/token?grant_type=client_credentials`;
}

function tokoStatus (status:Number) {
    // console.log(status);
    switch (status) {
        case 0:
            return 'Cancelled';
        case 3:
            return 'Rejected - OOS';
        case 5:
            return 'Cancelled - Fraud';
        case 6:
            return 'Rejected - OOS';
        case 10:
            return 'Rejected';
        case 15:
            return 'Cancelled';
        case 100:
            return 'Created';
        case 103:
            return 'Wait for payment';
        case 220:
            return 'New';
        case 221:
            return 'Wait for partner approval';
        case 400:
            return 'Accepted';
        case 450:
            return 'Wait for pickup';
        case 500:
            return 'Shipped';
        case 501:
            return 'Shipped - No AWB';
        case 520:
            return 'Invalid AWB';
        case 530:
            return 'AWB need correection';
        case 540:
            return 'Delivered to Pickup point';
        case 550:
            return 'Returned to Seller';
        case 600:
            return 'Delivered';
        case 601:
            return 'Open Case to Finish Order';
        case 690:
            return 'Fraud Review';
        case 700:
            return 'Order Finished';
        default:
            return 'Unknown';
    }
}

export { toko_gettoken, tokoStatus };