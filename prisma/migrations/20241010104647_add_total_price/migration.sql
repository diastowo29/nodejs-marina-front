-- AlterTable
ALTER TABLE "ord_products" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shipping_price" INTEGER,
ADD COLUMN     "total_amount" INTEGER,
ADD COLUMN     "total_product_price" INTEGER;
