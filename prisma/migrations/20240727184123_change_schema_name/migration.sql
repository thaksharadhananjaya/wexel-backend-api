/*
  Warnings:

  - You are about to drop the `Appoinment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_doctorDetailId_fkey";

-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_userId_fkey";

-- DropTable
DROP TABLE "Appoinment";

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "doctorDetailId" TEXT NOT NULL,
    "videoCallUrl" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "appointmentTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorDetailId_fkey" FOREIGN KEY ("doctorDetailId") REFERENCES "DoctorDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
