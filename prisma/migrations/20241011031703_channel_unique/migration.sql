/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `channel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "channel_name_key" ON "channel"("name");
