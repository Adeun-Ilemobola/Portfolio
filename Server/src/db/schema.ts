// drizzle/schema/project.ts
import {
    pgTable,
    text,
    varchar,
    integer,
    boolean,
    bigint,
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
    lastModified: bigint('last_modified', { mode: 'number' }).notNull(),
  });


  export const projectTools = pgTable('project_tools', {
    id: varchar('id', { length: 36 }).primaryKey(),
    projectId: varchar('project_id', { length: 36 }).notNull().references(() => projects.id),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description').notNull(),
  });





export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  date: varchar('date', { length: 255 }).notNull(),
  ip: varchar('ip', { length: 64 }).notNull(),
  timezone: varchar('timezone', { length: 64 }).notNull(),
  browser: varchar('browser', { length: 128 }).notNull(),
  os: varchar('os', { length: 128 }).notNull(),
  device: varchar('device', { length: 128 }).notNull(),
  country: varchar('country', { length: 128 }).notNull(),
  city: varchar('city', { length: 128 }).notNull(),
  region: varchar('region', { length: 128 }).notNull(),
  gps: varchar('gps', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
});
  
  