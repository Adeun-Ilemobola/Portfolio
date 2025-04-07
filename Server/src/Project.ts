import { Hono } from 'hono';
import { zPorject } from './ZodObject';
import { zValidator } from '@hono/zod-validator'


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
        const exampleProject = {
            name: "My Cool Project",
            image: [
                {
                    name: "screenshot.png",
                    base64: "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
                    size: 204800,
                    type: "image/png",
                    lastModified: "2025-04-05T12:00:00.000Z"
                }
            ],
            Repository: "https://github.com/username/my-cool-project",
            DeploymentPlatform: "Vercel",
            url: "https://mycoolproject.vercel.app",
            tool: [
                {
                    name: "React",
                    Description: "A JavaScript library for building user interfaces."
                },
                {
                    name: "TypeScript",
                    Description: "A strongly typed programming language that builds on JavaScript."
                }
            ],
            PublishedDate: "2025-04-01T00:00:00.000Z"
        };


        return c.json(exampleProject);



    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})

ProjectRoute.get("/", async (c) => {
    try {

        return c.text("all entities");


    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})

ProjectRoute.post('/', vProjectPost, async (c) => {
    try {
        const validated = c.req.valid("json");
        console.log(validated);
        return c.text("success")



    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})

export default ProjectRoute;
