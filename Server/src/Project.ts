import { Hono } from 'hono';
import { zPorject } from './ZodObject';
import { zValidator } from '@hono/zod-validator'
import { drizzle } from 'drizzle-orm/postgres-js';
import { projects, projectTools, projectImages } from './db/schema';
import { nanoid } from 'nanoid';
import { eq } from "drizzle-orm";
import { db } from './db';
import { z } from 'zod';
type Project = z.infer<typeof zPorject>;

const vProjectPost = zValidator(
    "json",
    zPorject
)
const ProjectRoute = new Hono();
ProjectRoute.get("/:id", async (c) => {
    try {
        console.log("GET PROJECT ID", {
            url: c.req.url,
            db: process.env.DATABASE_URL!
        });

        const { id } = c.req.param()
        if (id.length <= 0) {
            return c.text("no ID", 401);
        }
        console.log("GET PROJECT", {
            id: id,
            url: c.req.url,
            db: process.env.DATABASE_URL!
        });


        const [project] = await db.select().from(projects).where(eq(projects.id, id));
        if (project === undefined) {
            return c.text("no project found", 404);
        }
        const tools = await db.select().from(projectTools).where(eq(projectTools.projectId, id));
        const images = await db.select().from(projectImages).where(eq(projectImages.projectId, id));
        const exampleProject = {
            ...project,
            tool: tools,
            image: images
        }

    
        return c.json(exampleProject);

    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})

ProjectRoute.get("/", async (c) => {
    try {
        console.log("GET PROJECT LIST", {
            url: c.req.url,
            db: process.env.DATABASE_URL!
        });
        const projectsList = await db.select().from(projects);
        const pList: Project[] = await Promise.all(projectsList.map(async (project) => {
            const tools = await db.select().from(projectTools).where(eq(projectTools.projectId, project.id));
            const images = await db.select().from(projectImages).where(eq(projectImages.projectId, project.id));
            return {
                name: project.name,
                id: project.id,
                repository: project.repository,
                deploymentPlatform: project.deploymentPlatform,
                url: project.url,
                publishedDate: project.publishedDate ?? "",
                tool: tools,
                image: images
            }

        }))
       


        return c.json(pList);


    } catch (error) {
        console.error("Database connection error:", error);
        return c.text(`Something went wrong at  ${c.req.url}`, 500);

    }
})

ProjectRoute.post('/', vProjectPost, async (c) => {
    try {
        console.log("POST PROJECT MAKE", {
            url: c.req.url,
            db: process.env.DATABASE_URL!
        });;

        const validated = c.req.valid("json");
        if (!validated) {
            return c.text("Invalid data", 400);
        }
        const { image, tool } = validated;
        const project = {
            id: nanoid(),
            name: validated.name,
            repository: validated.repository,
            deploymentPlatform: validated.deploymentPlatform,
            url: validated.url,
            publishedDate: validated.publishedDate ?? "",
        }
        const [createdProject] = await db.insert(projects).values(project).returning();


        const tools = await db.insert(projectTools).values(tool.map(val => {
            return {
                id: nanoid(),
                projectId: createdProject.id,
                name: val.name,
                description: val.description
            }
        })).returning()

        const images = await db.insert(projectImages).values(image.map(val => {
            return {
                id: nanoid(),
                projectId: createdProject.id,
                name: val.name,
                base64: val.base64,
                size: val.size,
                type: val.type,
                lastModified: Number(val.lastModified)
            }
        })).returning()


        return c.json({
            name: createdProject.name,
            id: createdProject.id,
            repository: createdProject.repository,
            deploymentPlatform: createdProject.deploymentPlatform,
            url: createdProject.url,
            publishedDate: createdProject.publishedDate ?? "",
            tool: tools,
            image: images
        })



    } catch (error) {
        console.error("Database connection error:", error);
        return c.text(`Something went wrong at  ${c.req.url}`, 500);

    }
})


ProjectRoute.put('/', vProjectPost, async (c) => {
    try {
        console.log("PUT PROJECT UPDATE", {
            url: c.req.url,
            db: process.env.DATABASE_URL!

        });
        const validated = c.req.valid("json");
        if (!validated || !validated.id) {
            console.log("Invalid data", validated);
            return c.text("invalid entry", 401)
        }


        const [project] = await db.update(projects).set({
            name: validated.name,
            repository: validated.repository,
            deploymentPlatform: validated.deploymentPlatform,
            url: validated.url,
            publishedDate: validated.publishedDate ?? "",
        }).where(eq(projects.id, validated.id)).returning();


        await db.delete(projectTools).where(eq(projectTools.projectId, validated.id));
        await db.delete(projectImages).where(eq(projectImages.projectId, validated.id));

        const newTools = await db.insert(projectTools).values(validated.tool.map(val => {
            return {
                id: nanoid(),
                projectId: project.id,
                name: val.name,
                description: val.description
            }
        })).returning()
        const newImages = await db.insert(projectImages).values(validated.image.map(val => {
            return {
                id: nanoid(),
                projectId: project.id,
                name: val.name,
                base64: val.base64,
                size: val.size,
                type: val.type,
                lastModified: Number(val.lastModified)
            }
        })).returning()

        return c.json({
            name: project.name,
            id: project.id,
            repository: project.repository,
            deploymentPlatform: project.deploymentPlatform,
            url: project.url,
            publishedDate: project.publishedDate ?? "",
            tool: newTools,
            image: newImages

        })




    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)
    }
})


ProjectRoute.delete('/:id', async (c) => {
    try {
       
        const { id } = c.req.param();
        if (id.length <= 0) {
            return c.text("no ID", 401);
        }
        console.log("DELETE PROJECT", {
            id: id,
            url: c.req.url,
            db: process.env.DATABASE_URL!
        });

        await db.delete(projectTools).where(eq(projectTools.projectId, id));
        await db.delete(projectImages).where(eq(projectImages.projectId, id));

        await db.delete(projects).where(eq(projects.id, id));
      

        return c.text("deleted", 200);

    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)
    }
})

export default ProjectRoute;
