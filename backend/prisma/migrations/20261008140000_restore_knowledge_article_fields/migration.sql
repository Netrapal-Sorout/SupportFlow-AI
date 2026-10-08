-- Restore Knowledge Base enum types and fields required by the current Prisma schema.

-- Restore ArticleCategory enum.
CREATE TYPE "ArticleCategory" AS ENUM (
  'BILLING',
  'ACCOUNT',
  'SHIPPING',
  'TECHNICAL',
  'GENERAL'
);

-- Restore ArticleStatus enum.
CREATE TYPE "ArticleStatus" AS ENUM (
  'PUBLISHED',
  'DRAFT'
);

-- Convert the existing category column from TEXT to ArticleCategory.
ALTER TABLE "knowledge_articles"
ALTER COLUMN "category" TYPE "ArticleCategory"
USING "category"::"ArticleCategory";

-- Restore slug.
ALTER TABLE "knowledge_articles"
ADD COLUMN "slug" TEXT;

-- Restore status.
ALTER TABLE "knowledge_articles"
ADD COLUMN "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT';

-- Restore views.
ALTER TABLE "knowledge_articles"
ADD COLUMN "views" INTEGER NOT NULL DEFAULT 0;

-- Restore helpfulCount.
ALTER TABLE "knowledge_articles"
ADD COLUMN "helpfulCount" INTEGER NOT NULL DEFAULT 0;

-- slug is required by the Prisma schema.
ALTER TABLE "knowledge_articles"
ALTER COLUMN "slug" SET NOT NULL;

-- slug must be unique.
CREATE UNIQUE INDEX "knowledge_articles_slug_key"
ON "knowledge_articles"("slug");