-- Restore workspace support required by the current Prisma schema.

CREATE TABLE "workspaces" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  "language" TEXT NOT NULL DEFAULT 'en',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "workspaces_slug_key"
ON "workspaces"("slug");

ALTER TABLE "users"
ADD COLUMN "preferences" JSONB;

ALTER TABLE "users"
ADD COLUMN "workspaceId" TEXT;

CREATE INDEX "users_workspaceId_idx"
ON "users"("workspaceId");

ALTER TABLE "users"
ADD CONSTRAINT "users_workspaceId_fkey"
FOREIGN KEY ("workspaceId")
REFERENCES "workspaces"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;