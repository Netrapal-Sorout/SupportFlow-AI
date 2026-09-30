/*
  Warnings:

  - You are about to drop the column `helpfulCount` on the `knowledge_articles` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `knowledge_articles` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `knowledge_articles` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `knowledge_articles` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `workspaces` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `category` on the `knowledge_articles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `authorId` on table `knowledge_articles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "knowledge_articles" DROP CONSTRAINT "knowledge_articles_authorId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_workspaceId_fkey";

-- DropIndex
DROP INDEX "knowledge_articles_slug_key";

-- DropIndex
DROP INDEX "knowledge_articles_status_idx";

-- DropIndex
DROP INDEX "tickets_createdAt_idx";

-- DropIndex
DROP INDEX "users_workspaceId_idx";

-- AlterTable
ALTER TABLE "knowledge_articles" DROP COLUMN "helpfulCount",
DROP COLUMN "slug",
DROP COLUMN "status",
DROP COLUMN "views",
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "preferences",
DROP COLUMN "workspaceId";

-- DropTable
DROP TABLE "workspaces";

-- DropEnum
DROP TYPE "ArticleCategory";

-- DropEnum
DROP TYPE "ArticleStatus";

-- CreateIndex
CREATE INDEX "knowledge_articles_category_idx" ON "knowledge_articles"("category");

-- CreateIndex
CREATE INDEX "knowledge_articles_authorId_idx" ON "knowledge_articles"("authorId");

-- AddForeignKey
ALTER TABLE "knowledge_articles" ADD CONSTRAINT "knowledge_articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
