-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Streaming" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Link" TEXT NOT NULL,

    CONSTRAINT "Streaming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStreaming" (
    "id" SERIAL NOT NULL,
    "IdUser" TEXT NOT NULL,
    "StreamingId" INTEGER NOT NULL,

    CONSTRAINT "UserStreaming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentConf" (
    "id" SERIAL NOT NULL,
    "PixKey" TEXT NOT NULL,
    "IdUser" TEXT NOT NULL,
    "DataVencimento" INTEGER NOT NULL,

    CONSTRAINT "PaymentConf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFaturas" (
    "id" SERIAL NOT NULL,
    "IdUser" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL,
    "DataVencimento" DATE NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "UserFaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditUser" (
    "id" SERIAL NOT NULL,
    "IdUser" TEXT NOT NULL,
    "Credit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CreditUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Streaming_name_key" ON "Streaming"("name");

-- AddForeignKey
ALTER TABLE "UserStreaming" ADD CONSTRAINT "UserStreaming_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStreaming" ADD CONSTRAINT "UserStreaming_StreamingId_fkey" FOREIGN KEY ("StreamingId") REFERENCES "Streaming"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentConf" ADD CONSTRAINT "PaymentConf_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFaturas" ADD CONSTRAINT "UserFaturas_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditUser" ADD CONSTRAINT "CreditUser_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
