-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "metaData" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initialMoney" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);
