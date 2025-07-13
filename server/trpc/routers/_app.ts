import { array, z } from 'zod';
import { createTRPCRouter, baseProcedure, protectedProcedure } from '../init';
import { create } from 'domain';
import { projectdb, projectSchema, imageSchema, imagedb, projectCreateSchema, imageCreateSchema  } from '@/lib/auth-schema';
import { clean } from 'better-auth/react';
import db from '@/lib/database';
import { eq } from 'drizzle-orm'
import { get } from 'http';

// Root API router, aggregate your subrouters here
export const appRouter = createTRPCRouter({



    createProject:
        protectedProcedure
            .input(
                z.object({
                    project: projectCreateSchema, // Use the Zod schema for input validation
                    images: z.array(imageCreateSchema) // Optional array of images
                })
            )
            .mutation(async ({ input , ctx }) => {
                try {
                    // Logic to create a new project in the database
                    // This is where you would interact with your database to save the project
                    const { user } = ctx;
                    const { project, images } = input;

                    console.log("Finish the cleanup for my project and the images", project, images);
                    

                    const [newProject] = await db.insert(projectdb).values({...project , userId: user.id}).returning();
                    if (!newProject) {
                       return { success: false, meg: "Failed to create project" };
                    }
                    console.log("New project created:", newProject);
                    
                    const newImgages = await db.insert(imagedb).values(images.map(image => ({ ...image, projectId: newProject.id }))).returning();
                    if (!newImgages || newImgages.length === 0) {
                        return { success: false, meg: "Failed to create images" };
                    }

                    console.log("New images created:", newImgages);


                    return { success: true, meg: "Successfully created project" }; // Replace with actual project ID
                } catch (error) {
                    console.error("Error creating project:", error);
                    return { success: false, meg: "Failed to create project" };

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
                        return { success: false, data: null};
                    }
                    return { 
                        success: true, 
                        data: projects.map(project => ({
                        id: project.id,
                        title: project.title,
                        tools: project.technologies || [], // Assuming technologies is an array of tools
                    }))
                          


                    };
                } catch (error) {
                    console.error("Error fetching projects:", error);
                    return { success: false, data: null };
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
