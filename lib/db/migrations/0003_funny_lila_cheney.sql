CREATE TABLE "about" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"is_public" boolean NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
