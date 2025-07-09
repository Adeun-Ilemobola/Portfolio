import { array, z } from 'zod';
import { createTRPCRouter, baseProcedure } from '../init';
import { create } from 'domain';
import { projectdb, projectSchema, imageSchema, imagedb  } from '@/lib/auth-schema';
import { clean } from 'better-auth/react';
import db from '@/lib/database';
import { eq } from 'drizzle-orm'
import { get } from 'http';

// Root API router, aggregate your subrouters here
export const appRouter = createTRPCRouter({



    createProject:
        baseProcedure
            .input(
                z.object({
                    project: projectSchema, // Use the Zod schema for input validation
                    images: z.array(imageSchema) // Optional array of images
                })
            )
            .mutation(async ({ input }) => {
                try {
                    // Logic to create a new project in the database
                    // This is where you would interact with your database to save the project
                    const { project, images } = input;
                    const { id, ...cleanProject } = project; // Clean the project object to remove the id field if needed
                    const cleanedImages = images.map(image => {
                        const { id, ...cleanImage } = image; // Clean each image object to remove the id field if needed
                        return cleanImage;
                    });

                    const [newProject] = await db.insert(projectdb).values(cleanProject).returning();
                    if (!newProject) {
                       return { success: false, data: "Failed to create project" };
                    }
                    const newImgages = await db.insert(imagedb).values(cleanedImages.map(image => ({ ...image, projectId: newProject.id })));
                    if (!newImgages || newImgages.length === 0) {
                        return { success: false, data: "Failed to create images" };
                    }


                    return { success: true, data: "" }; // Replace with actual project ID
                } catch (error) {
                    console.error("Error creating project:", error);
                    return { success: false, error: "Failed to create project" };

                }

            }),

    getProjectsShowcase:
        baseProcedure
            .input(z.object({
                limit: z.number().optional().default(10), // Optional limit for the number of projects to fetch
                offset: z.number().optional().default(0) // Optional offset for pagination
            }))
            .query(async ({ input }) => {
                try {
                    // Logic to fetch projects for showcase
                    const { limit, offset } = input;
                    const projects = await db.select().from(projectdb).limit(limit).offset(offset);
                    if (!projects || projects.length === 0) {
                        return { success: false, data: "No projects found" };
                    }
                    return { success: true, data: projects };
                } catch (error) {
                    console.error("Error fetching projects:", error);
                    return { success: false, error: "Failed to fetch projects" };
                }
            }),   
            
            
    getProjectById:
        baseProcedure
            .input(z.object({
                id: z.string() // Project ID to fetch
            }))
            .query(async ({ input }) => {
                try {
                    // Logic to fetch a project by ID
                    const { id } = input;
                    const project = await db.select().from(projectdb).where(eq(projectdb.id , id)).limit(1);
                    if (!project || project.length === 0) {
                        return { success: false, data: "Project not found" };
                    }
                    return { success: true, data: project[0] };
                } catch (error) {
                    console.error("Error fetching project by ID:", error);
                    return { success: false, error: "Failed to fetch project" };
                }
            }),




      

});
// Export type definition for tRPC hooks
export type AppRouter = typeof appRouter;
