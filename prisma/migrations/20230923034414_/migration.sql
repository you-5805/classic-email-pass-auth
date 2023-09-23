-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "display_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "solt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_display_id_key" ON "users"("display_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
