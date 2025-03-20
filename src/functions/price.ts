export const formatPrice = (price:Number) => {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}