-- CreateEnum
CREATE TYPE "Type" AS ENUM ('APARTMENT', 'HOUSE');

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'APARTMENT',
    "price" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "isPetFriendly" BOOLEAN NOT NULL,
    "isFurnished" BOOLEAN NOT NULL,
    "isSharedRoom" BOOLEAN NOT NULL,
    "isSharedBathroom" BOOLEAN NOT NULL,
    "isSharedKitchen" BOOLEAN NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "lessorId" TEXT NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "apartmentId" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lessor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,

    CONSTRAINT "Lessor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lessor_email_key" ON "Lessor"("email");

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_lessorId_fkey" FOREIGN KEY ("lessorId") REFERENCES "Lessor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
