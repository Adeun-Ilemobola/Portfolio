import { Hono } from 'hono';
import { zPorject } from './ZodObject';
import { zValidator } from '@hono/zod-validator'
import { drizzle } from 'drizzle-orm/postgres-js';
import { projects , projectTools  , projectImages } from './db/schema';
import { nanoid } from 'nanoid';
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);
const vProjectPost = zValidator(
    "json",
    zPorject
)
const ProjectRoute = new Hono();
ProjectRoute.get("/:id", async (c) => {
    try {
        const { id } = c.req.param()
        if (id.length <= 0) {
            return c.text("no ID", 401);
        }
        console.log(id);
        const project = await db.select().from(projects).where(eq(projects.id, id));
        if (project.length <= 0) {
            return c.text("no project found", 404);
        }
        const tools = await db.select().from(projectTools).where(eq(projectTools.projectId, id));
        const images = await db.select().from(projectImages).where(eq(projectImages.projectId, id));
        const exampleProject = {
            ...project[0],
            tools: tools,
            images: images
        }

        return c.json(exampleProject);

    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})

ProjectRoute.get("/", async (c) => {
    try {
        const projectsList = await db.select().from(projects);
        const pList = Promise.all(projectsList.map(async (project) => {
            const tools = await db.select().from(projectTools).where(eq(projectTools.projectId, project.id));
            const images = await db.select().from(projectImages).where(eq(projectImages.projectId, project.id));
            return {
                ...project,
                tools: tools,
                images: images
            }
            
        }))
        const allProjects = await pList;
        return c.json(allProjects);


    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})

ProjectRoute.post('/', vProjectPost, async (c) => {
    try {
        const validated = c.req.valid("json");
        if (!validated) {
            return c.text("Invalid data", 400);
        }
        console.log(validated);
        const {  image, tool} = validated;
        const project = {
            id: nanoid(),
            name: validated.name,
            repository: validated.Repository,
            deploymentPlatform: validated.DeploymentPlatform,
            url: validated.url,
            publishedDate: validated.PublishedDate,      
        }
        const [createdProject] = await db.insert(projects).values(project).returning();
       

        const tools =  await db.insert(projectTools).values(tool.map(val=>{
            return {
                id: nanoid(),
                projectId: createdProject.id,
                name: val.name,
                description: val.Description
            }
        })).returning()

        const images = await db.insert(projectImages).values(image.map(val=>{
            return {
                id: nanoid(),
                projectId: createdProject.id,
                name: val.name,
                base64: val.base64,
                size: val.size,
                type: val.type,
                lastModified: val.lastModified
            }
        })).returning()


        return c.json({
            ...createdProject,
            tools: tools,
            images: images
        })



    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})

export default ProjectRoute;
