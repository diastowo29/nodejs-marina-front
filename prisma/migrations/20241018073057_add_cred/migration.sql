-- CreateTable
CREATE TABLE "cred_channel" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT,
    "clientSecret" TEXT,
    "accToken" TEXT,
    "tokenType" TEXT,
    "channelId" INTEGER,

    CONSTRAINT "cred_channel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cred_channel" ADD CONSTRAINT "cred_channel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
