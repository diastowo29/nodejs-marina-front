/*
  Warnings:

  - A unique constraint covering the columns `[origin_id]` on the table `store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "store_origin_id_key" ON "store"("origin_id");
