import { z } from 'zod';
import { createTRPCRouter, baseProcedure, protectedProcedure } from '../init';
import { projectdb, imagedb, projectCreateSchema, imageCreateSchema, aboutCreateSchema, aboutdb } from '@/lib/auth-schema';
import db from '@/lib/database';
import { eq } from 'drizzle-orm'
import { DeleteImages } from '@/lib/supabase';

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
            .mutation(async ({ input, ctx }) => {
                try {
                    // Logic to create a new project in the database
                    // This is where you would interact with your database to save the project
                    const { user } = ctx;
                    const { project, images } = input;

                    console.log("Finish the cleanup for my project and the images", project, images);


                    const [newProject] = await db.insert(projectdb).values({ ...project, userId: user.id }).returning();
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
                        return { success: false, data: null };
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
            .mutation(async ({ input }) => {
                try {
                    // Logic to fetch a project by ID
                    const { id } = input;
                    const [project] = await db.select().from(projectdb).where(eq(projectdb.id, id));
                    if (!project) {
                        return { success: false, message: "Project not found", data: null };
                    }

                    return {
                        success: true,
                        data: {
                            project: project,
                            images: await db.select().from(imagedb).where(eq(imagedb.projectId, id))

                        },
                        message: "Successfully fetched project"
                    };
                } catch (error) {
                    console.error("Error fetching project by ID:", error);
                    return { success: false, message: "Failed to fetch project", data: null };
                }
            }),



    createAboutRecord:
        protectedProcedure
            .input(
                z.object({
                    aboutRecord: aboutCreateSchema, // Use the Zod schema for input validation
                })
            )
            .mutation(async ({ input }) => {
                try {
                    // Logic to create a new project in the database
                    // This is where you would interact with your database to save the project
                    const { aboutRecord } = input;

                    console.log("Finish the cleanup for my project and the images", aboutRecord);


                    const [newRecord] = await db.insert(aboutdb).values({ ...aboutRecord }).returning();
                    if (!newRecord) {
                        return { success: false, meg: "Failed to create project" };
                    }
                    console.log("New project created:", newRecord);
                    return { success: true, meg: "Successfully created project" }; // Replace with actual project ID
                } catch (error) {
                    console.error("Error creating project:", error);
                    return { success: false, meg: "Failed to create project" };

                }

            }),


    getAllAboutRecord:
        baseProcedure
            .input(z.object({
                limit: z.number().optional().default(10), // Optional limit for the number of projects to fetch
                offset: z.number().optional().default(0) // Optional offset for pagination
            }))
            .query(async ({ input }) => {
                try {
                    // Logic to fetch projects for showcase
                    const { limit, offset } = input;
                    const records = await db.select().from(aboutdb).limit(limit).offset(offset);
                    if (!records || records.length === 0) {
                        return { success: false, record: null };
                    }
                    return { success: true, record: records };
                } catch (error) {
                    console.error("Error fetching about Record:", error);
                    return { success: false, record: null };
                }
            }),

    updateAboutRecord:
        protectedProcedure
            .input(aboutCreateSchema.extend({ id: z.string() }))
            .mutation(async ({ input }) => {
                try {
                    console.log(" my about Record  aand start the update process", input);
                    const [newRecord] = await
                        db.update(aboutdb).set({
                            content: input.content,
                            isPublic: input.isPublic,
                            updatedAt: new Date()
                        }).where(
                            eq(aboutdb.id, input.id)
                        ).returning();
                    if (!newRecord) {
                        return { success: false, message: "Failed to create about Record" };
                    }
                    console.log("New about Record created:", newRecord);
                    return { success: true, message: "Successfully created about Record" }; // Replace with actual project ID
                } catch (error) {
                    console.error("Error creating project:", error);
                    return { success: false, message: "Failed to create about Record" };

                }
            }),



    DeactivateAboutRecord:
        baseProcedure
            .input(z.object({
                id: z.array(z.string())
            }))
            .mutation(async ({ input }) => {
                try {
                    const { id } = input;
                    await Promise.all(id.map(async (id) => {
                        const record = await db.update(aboutdb).set({
                            isPublic: false
                        }).where(
                            eq(aboutdb.id, id)
                        ).returning();

                        return record
                    }))
                    return { success: true, value: "Successfully deactivated  about Record" };


                } catch (error) {
                    console.error("Error fetching  about Record by ID:", error);
                    return { success: false, value: "Failed to fetch about Record" };
                }
            }),

    DelImages:
        baseProcedure
            .input(z.object({
                supabaseID: z.string(),

            }))
            .mutation(async ({ input }) => {
                try {
                    const { supabaseID } = input;
                    await DeleteImages([supabaseID]);
                    await db.delete(imagedb).where(eq(imagedb.supabaseID, supabaseID));
                    return { success: true, value: "Successfully deleted images" };
                } catch (error) {
                    console.error("Error deleting images:", error);
                    return { success: false, value: "Failed to delete images" };
                }
            }),



    updataProject:
        protectedProcedure
            .input(
                z.object({
                    project: projectCreateSchema.extend({ id: z.string() }),
                    images: z.array(imageCreateSchema)
                })
            )
            .mutation(async ({ input }) => {
                try {
                    console.log(" my project  aand start the update process", input);
                    const { project, images } = input;
                    const [newRecord] = await
                        db.update(projectdb).set({
                            title: project.title,
                            description: project.description,
                            liveLink: project.liveLink,
                            githubLink: project.githubLink,
                            technologies: project.technologies,

                            isPublic: project.isPublic,
                            updatedAt: new Date()
                        }).where(
                            eq(projectdb.id, project.id)
                        ).returning();

                    if (!newRecord) {
                        return { success: false, message: "Failed to create project" };
                    }


                    await db.insert(imagedb).values(images.map(image => ({ ...image, projectId: newRecord.id }))).returning();

                    console.log("New project created:", newRecord);
                    return { success: true, message: "Successfully created project" }; // Replace with actual project ID
                } catch (error) {
                    console.error("Error creating project:", error);
                    return { success: false, message: "Failed to create project" };
                }
            }),


            deleteProject:
                baseProcedure
                    .input(z.object({
                        id: z.string()
                    }))
                    .mutation(async ({ input }) => {
                        try {
                            const { id } = input;
                            await db.delete(projectdb).where(eq(projectdb.id, id));
                            const deletedImages = await db.delete(imagedb).where(eq(imagedb.projectId, id)).returning();
                            await DeleteImages(deletedImages.map(img => img.supabaseID));
                            return { success: true, value: "Successfully deleted project" };
                        } catch (error) {
                            console.error("Error deleting project:", error);
                            return { success: false, value: "Failed to delete project" };
                        }
                    }), 








});
// Export type definition for tRPC hooks
export type AppRouter = typeof appRouter;
