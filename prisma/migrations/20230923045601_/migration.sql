/*
  Warnings:

  - You are about to drop the column `solt` on the `users` table. All the data in the column will be lost.
  - Added the required column `salt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "email_verification_intents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "email_verification_intents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "salt" TEXT NOT NULL,
    "has_email_verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("created_at", "display_id", "email", "id", "password_hash", "updated_at") SELECT "created_at", "display_id", "email", "id", "password_hash", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_display_id_key" ON "users"("display_id");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
