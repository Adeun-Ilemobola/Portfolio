// drizzle/schema/project.ts
import {
    pgTable,
    text,
    varchar,
    integer,
    json,
    timestamp,
    serial,
  } from 'drizzle-orm/pg-core';
  
  export const projects = pgTable('projects', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    repository: text('repository').notNull(),
    deploymentPlatform: text('deployment_platform').notNull(),
    url: text('url').notNull(),
    publishedDate: varchar('published_date', { length: 255 }) // ISO string
  });

  export const projectImages = pgTable('project_images', {
    id: varchar('id', { length: 36 }).primaryKey(),
    projectId: varchar('project_id', { length: 36 }).notNull().references(() => projects.id),
    name: text('name').notNull(),
    base64: text('base64').notNull(),
    size: integer('size').notNull(),
    type: text('type').notNull(),
    lastModified: integer('last_modified').notNull(),
  });


  export const projectTools = pgTable('project_tools', {
    id: varchar('id', { length: 36 }).primaryKey(),
    projectId: varchar('project_id', { length: 36 }).notNull().references(() => projects.id),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description').notNull(),
  });
  
  