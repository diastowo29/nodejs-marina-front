/*
  Warnings:

  - A unique constraint covering the columns `[origin_id]` on the table `chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[origin_id]` on the table `chat_line` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[origin_id]` on the table `chat_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "chat_user" ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "chat_origin_id_key" ON "chat"("origin_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_line_origin_id_key" ON "chat_line"("origin_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_user_origin_id_key" ON "chat_user"("origin_id");
