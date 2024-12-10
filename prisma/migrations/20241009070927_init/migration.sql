-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "origin_id" TEXT,
    "status" TEXT,
    "channelId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "org_products" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "origin_id" TEXT,
    "qty" INTEGER NOT NULL,
    "invoice" TEXT,
    "price" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "sku" TEXT,
    "notes" TEXT,
    "ordersId" INTEGER,

    CONSTRAINT "org_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "logistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "code" TEXT,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "shop_id" TEXT,
    "payment_id" TEXT,
    "origin_id" TEXT,
    "invoice" TEXT,
    "recp_name" TEXT,
    "recp_phone" TEXT,
    "recp_addr_full" TEXT,
    "recp_addr_district" TEXT,
    "recp_addr_city" TEXT,
    "recp_addr_province" TEXT,
    "recp_addr_country" TEXT,
    "recp_addr_postal_code" TEXT,
    "recp_addr_district_id" TEXT,
    "recp_addr_city_id" TEXT,
    "recp_addr_province_id" TEXT,
    "recp_addr_geo" TEXT,
    "logistic_service" TEXT,
    "origin_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accept_partial" BOOLEAN NOT NULL,
    "device" TEXT,
    "storeId" INTEGER,
    "customersId" INTEGER,
    "logisticId" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "org_products" ADD CONSTRAINT "org_products_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_logisticId_fkey" FOREIGN KEY ("logisticId") REFERENCES "logistic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
