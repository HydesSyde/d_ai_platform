ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token" text DEFAULT '';