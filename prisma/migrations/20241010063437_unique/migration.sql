/*
  Warnings:

  - A unique constraint covering the columns `[origin_id]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customers_origin_id_key" ON "customers"("origin_id");
