/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'google';
