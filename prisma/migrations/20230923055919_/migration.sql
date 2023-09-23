/*
  Warnings:

  - You are about to drop the column `salt` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "display_id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL DEFAULT 'ユーザー',
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "has_email_verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("created_at", "display_id", "display_name", "email", "has_email_verified", "id", "password_hash", "updated_at") SELECT "created_at", "display_id", "display_name", "email", "has_email_verified", "id", "password_hash", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_display_id_key" ON "users"("display_id");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
