import { pgTable, text, timestamp, boolean, integer, json } from "drizzle-orm/pg-core";
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
export const user = pgTable("user", {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()), // Use UUID for unique project IDs
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires')
});

export const session = pgTable("session", {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()), // Use UUID for unique project IDs
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text('impersonated_by')
});

export const account = pgTable("account", {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()), // Use UUID for unique project IDs
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()), // Use UUID for unique project IDs
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});



export const imagedb = pgTable("image", {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()), // Use UUID for unique project IDs
	name: text('name').notNull(), // Name of the image file
	url: text('url').notNull(),
	size: integer('size').notNull(), // Size of the image in bytes
	type: text('type').notNull(), // MIME type of the image (e.g., 'image/png', 'image/jpeg')
	lastModified: timestamp('last_modified').notNull(), // Last modified date of the image
	supabaseID: text('supabase_id').notNull().unique(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	projectId: text('project_id').notNull().references(() => projectdb.id, { onDelete: 'cascade' }).notNull(), // Reference to the project this image belongs to
})
export const projectdb = pgTable("project", {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()), // Use UUID for unique project IDs
	title: text('title').notNull(),
	description: text('description').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	isPublic: boolean('is_public').$defaultFn(() => true).notNull(),
	technologies: json('technologies').$type<string[]>().$defaultFn(() => []).notNull(),
	githubLink: text('github_link'), // Link to the GitHub repository
	liveLink: text('live_link'), // Link to the live project
})
export const schema = {
	user,
	session,
	account,
	verification,
	imagedb,
	projectdb
};
/// ----------------- Zod Schemas ----------------- ///

// ── Image ──────────────────────────────────────────────────────────────────────
export const imageSchema = z.object({
	id: z.string(),               // text UUID
	name: z.string(),             // notNull text
	url: z.string().url(),        // notNull text (valid URL)
	size: z.number().int(),       // notNull integer
	type: z.string(),             // notNull text (e.g. "image/png")
	lastModified: z.date(),       // notNull timestamp
	supabaseID: z.string(),       // notNull unique text          // notNull timestamp
	projectId: z.string().default(""),        // notNull text FK
});
export type Image = z.infer<typeof imageSchema>;


// ── Project ───────────────────────────────────────────────────────────────────
export const projectSchema = z.object({
	id: z.string(),               // text UUID
	title: z.string(),            // notNull text
	description: z.string(),      // notNull text
	createdAt: z.date(),          // notNull timestamp
	updatedAt: z.date(),          // notNull timestamp
	userId: z.string(),           // notNull text FK
	isPublic: z.boolean(),        // notNull boolean
	technologies: z.array(z.string()), // notNull JSON array
	githubLink: z.string().url(), // optional text
	liveLink: z.string().url()   // optional text
});
export type Project = z.infer<typeof projectSchema>;
export const defaultImage: Image = {
  id: '',
  name: '',
  url: '',
  size: 0,
  type: '',
  lastModified: new Date(),
  supabaseID: '',
  projectId: '',   
}
//–– a blank Project
export const defaultProject: Project = {
  id: '',
  title: '',
  description: '',
 
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: '',
  isPublic: false,
  technologies: [], // empty array
  githubLink: '',
  liveLink: '',
}


// fields the client *sends* when creating a project:
export const projectCreateSchema = z.object({
  title:       z.string(),
  description: z.string(),
  isPublic:    z.boolean().default(true),
  technologies: z.array(z.string()).default([]),
  githubLink:  z.string().url().optional(),
  liveLink:    z.string().url().optional(),
})

// fields the client *sends* when creating an image:
export const imageCreateSchema = z.object({
  name:         z.string(),
  url:          z.string().url(),
  size:         z.number().int(),
  type:         z.string(),
  // if you’re sending lastModified as an ISO string, coerce it:
  lastModified: z.coerce.date(),
  supabaseID:   z.string(),
})