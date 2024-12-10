-- AlterTable
ALTER TABLE "cred_channel" ADD COLUMN     "appId" TEXT;

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "origin_id" TEXT,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_user" (
    "id" SERIAL NOT NULL,
    "origin_id" TEXT,

    CONSTRAINT "chat_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_line" (
    "id" SERIAL NOT NULL,
    "origin_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "line_text" TEXT NOT NULL,
    "chat_userId" INTEGER,
    "chatId" INTEGER,

    CONSTRAINT "chat_line_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chat_line" ADD CONSTRAINT "chat_line_chat_userId_fkey" FOREIGN KEY ("chat_userId") REFERENCES "chat_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_line" ADD CONSTRAINT "chat_line_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
