/*
  Warnings:

  - A unique constraint covering the columns `[origin_id]` on the table `main_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "main_products_origin_id_key" ON "main_products"("origin_id");
