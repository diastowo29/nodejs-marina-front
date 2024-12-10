/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `org_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "org_products" DROP CONSTRAINT "org_products_ordersId_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_channelId_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_userId_fkey";

-- DropTable
DROP TABLE "Channel";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "org_products";

-- CreateTable
CREATE TABLE "channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_img" (
    "id" SERIAL NOT NULL,
    "origin_id" TEXT,
    "filename" TEXT,
    "status" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "originalUrl" TEXT,
    "thumbnailUrl" TEXT,
    "main_productsId" INTEGER,

    CONSTRAINT "products_img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "main_products" (
    "id" SERIAL NOT NULL,
    "origin_id" TEXT,
    "status" TEXT,
    "name" TEXT,
    "condition" INTEGER,
    "desc" TEXT,
    "category" INTEGER,
    "price" INTEGER,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" INTEGER,
    "stock" INTEGER,
    "sku" TEXT,
    "storeId" INTEGER,

    CONSTRAINT "main_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ord_products" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "invoice" TEXT,
    "total_price" INTEGER NOT NULL,
    "notes" TEXT,
    "ordersId" INTEGER,
    "main_productsId" INTEGER,

    CONSTRAINT "ord_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_img" ADD CONSTRAINT "products_img_main_productsId_fkey" FOREIGN KEY ("main_productsId") REFERENCES "main_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main_products" ADD CONSTRAINT "main_products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ord_products" ADD CONSTRAINT "ord_products_main_productsId_fkey" FOREIGN KEY ("main_productsId") REFERENCES "main_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ord_products" ADD CONSTRAINT "ord_products_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
