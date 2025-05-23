CREATE TABLE "project_images" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"project_id" varchar(36) NOT NULL,
	"name" text NOT NULL,
	"base64" text NOT NULL,
	"size" integer NOT NULL,
	"type" text NOT NULL,
	"last_modified" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_tools" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"project_id" varchar(36) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"repository" text NOT NULL,
	"deployment_platform" text NOT NULL,
	"url" text NOT NULL,
	"published_date" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"date" varchar(255) NOT NULL,
	"ip" varchar(64) NOT NULL,
	"timezone" varchar(64) NOT NULL,
	"browser" varchar(128) NOT NULL,
	"os" varchar(128) NOT NULL,
	"device" varchar(128) NOT NULL,
	"country" varchar(128) NOT NULL,
	"city" varchar(128) NOT NULL,
	"region" varchar(128) NOT NULL,
	"gps" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_tools" ADD CONSTRAINT "project_tools_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;