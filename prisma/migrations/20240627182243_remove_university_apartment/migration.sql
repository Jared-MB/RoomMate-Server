/*
  Warnings:

  - You are about to drop the column `apartmentId` on the `University` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "University" DROP CONSTRAINT "University_apartmentId_fkey";

-- AlterTable
ALTER TABLE "University" DROP COLUMN "apartmentId";
