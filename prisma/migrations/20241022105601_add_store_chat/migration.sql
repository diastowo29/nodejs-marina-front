-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
