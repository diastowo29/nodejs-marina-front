-- AlterTable
ALTER TABLE "chat_line" ADD COLUMN     "omnichat_userId" INTEGER;

-- CreateTable
CREATE TABLE "omnichat_user" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "thumbnailUrl" TEXT,
    "origin_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "omnichat_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "omnichat" (
    "id" SERIAL NOT NULL,
    "origin_id" TEXT,
    "last_message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeId" INTEGER,
    "omnichat_userId" INTEGER,

    CONSTRAINT "omnichat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "omnichat_line" (
    "id" SERIAL NOT NULL,
    "origin_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "line_text" TEXT NOT NULL,
    "omnichat_userId" INTEGER,
    "omnichatId" INTEGER,

    CONSTRAINT "omnichat_line_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "omnichat_user_origin_id_key" ON "omnichat_user"("origin_id");

-- CreateIndex
CREATE UNIQUE INDEX "omnichat_origin_id_key" ON "omnichat"("origin_id");

-- CreateIndex
CREATE UNIQUE INDEX "omnichat_line_origin_id_key" ON "omnichat_line"("origin_id");

-- AddForeignKey
ALTER TABLE "chat_line" ADD CONSTRAINT "chat_line_omnichat_userId_fkey" FOREIGN KEY ("omnichat_userId") REFERENCES "omnichat_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "omnichat" ADD CONSTRAINT "omnichat_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "omnichat" ADD CONSTRAINT "omnichat_omnichat_userId_fkey" FOREIGN KEY ("omnichat_userId") REFERENCES "omnichat_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "omnichat_line" ADD CONSTRAINT "omnichat_line_omnichat_userId_fkey" FOREIGN KEY ("omnichat_userId") REFERENCES "omnichat_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "omnichat_line" ADD CONSTRAINT "omnichat_line_omnichatId_fkey" FOREIGN KEY ("omnichatId") REFERENCES "omnichat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
