CREATE TABLE "image" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"size" integer NOT NULL,
	"type" text NOT NULL,
	"last_modified" timestamp NOT NULL,
	"supabase_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"project_id" text NOT NULL,
	CONSTRAINT "image_supabase_id_unique" UNIQUE("supabase_id")
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL,
	"is_public" boolean NOT NULL,
	"technologies" json NOT NULL,
	"github_link" text,
	"live_link" text
);
--> statement-breakpoint
ALTER TABLE "image" ADD CONSTRAINT "image_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;