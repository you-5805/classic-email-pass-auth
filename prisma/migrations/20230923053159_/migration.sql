-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_email_verification_intents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "email_verification_intents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_email_verification_intents" ("created_at", "expires_at", "id", "token", "updated_at", "user_id") SELECT "created_at", "expires_at", "id", "token", "updated_at", "user_id" FROM "email_verification_intents";
DROP TABLE "email_verification_intents";
ALTER TABLE "new_email_verification_intents" RENAME TO "email_verification_intents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
