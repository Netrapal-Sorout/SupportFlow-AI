CREATE TABLE "workspaces" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "supportEmail" TEXT,
  "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  "language" TEXT NOT NULL DEFAULT 'en',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "users" ADD COLUMN "preferences" JSONB;
ALTER TABLE "users" ADD COLUMN "workspaceId" TEXT;

CREATE TYPE "ArticleStatus" AS ENUM ('PUBLISHED', 'DRAFT');
CREATE TYPE "ArticleCategory" AS ENUM ('BILLING', 'ACCOUNT', 'SHIPPING', 'TECHNICAL', 'GENERAL');

CREATE TABLE "knowledge_articles" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" "ArticleCategory" NOT NULL DEFAULT 'GENERAL',
  "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
  "summary" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "views" INTEGER NOT NULL DEFAULT 0,
  "helpfulCount" INTEGER NOT NULL DEFAULT 0,
  "authorId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "knowledge_articles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "knowledge_articles_slug_key" ON "knowledge_articles"("slug");
CREATE INDEX "knowledge_articles_category_idx" ON "knowledge_articles"("category");
CREATE INDEX "knowledge_articles_status_idx" ON "knowledge_articles"("status");
CREATE INDEX "users_workspaceId_idx" ON "users"("workspaceId");
CREATE INDEX "tickets_createdAt_idx" ON "tickets"("createdAt");

ALTER TABLE "users" ADD CONSTRAINT "users_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "knowledge_articles" ADD CONSTRAINT "knowledge_articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
