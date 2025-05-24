CREATE TABLE "admin_user" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	" password_hash" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "adminId" varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_adminId_admin_user_id_fk" FOREIGN KEY ("adminId") REFERENCES "public"."admin_user"("id") ON DELETE no action ON UPDATE no action;