-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "apartmentId" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
