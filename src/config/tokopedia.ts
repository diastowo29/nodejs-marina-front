const toko_host = 'https://fs.tokopedia.net'
const toko_shopinfo = `${toko_host}/v1/shop/fs/18229/shop-info?page=1&per_page=10`

function toko_gettoken () {
    return  `https://accounts.tokopedia.com/token?grant_type=client_credentials`;
}

export { toko_gettoken };