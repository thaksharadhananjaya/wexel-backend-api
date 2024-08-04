/*
  Warnings:

  - You are about to drop the column `speciality` on the `DoctorDetail` table. All the data in the column will be lost.
  - Added the required column `specialty` to the `DoctorDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DoctorDetail" DROP COLUMN "speciality",
ADD COLUMN     "specialty" TEXT NOT NULL;
