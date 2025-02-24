-- CreateTable
CREATE TABLE "LimitOrder" (
    "id" SERIAL NOT NULL,
    "currencyName" TEXT NOT NULL,
    "currencyPrice" DOUBLE PRECISION NOT NULL,
    "assetsQuantity" DOUBLE PRECISION NOT NULL,
    "orderType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "desirableAssetsPercent" DOUBLE PRECISION NOT NULL,
    "orderValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LimitOrder_pkey" PRIMARY KEY ("id")
);
