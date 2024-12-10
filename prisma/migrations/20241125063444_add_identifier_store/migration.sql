/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "omnichat" ADD COLUMN     "last_messageId" TEXT;

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "identifier" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "store_identifier_key" ON "store"("identifier");
