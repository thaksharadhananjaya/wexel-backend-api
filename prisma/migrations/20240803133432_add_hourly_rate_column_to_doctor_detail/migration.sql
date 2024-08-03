/*
  Warnings:

  - Added the required column `hourlyRate` to the `DoctorDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DoctorDetail" ADD COLUMN     "hourlyRate" DOUBLE PRECISION NOT NULL;
