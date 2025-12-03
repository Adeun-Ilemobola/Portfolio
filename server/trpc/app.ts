import { any, z } from 'zod';
import { createTRPCRouter, PublicBase, PrivateBase } from './init';
import { Send } from 'lucide-react';
import { ContactIDType, ContactSchema, ProjectIDType, ProjectSchema } from '@/lib/ZodObject';
import { projectsListViewType, State } from '@/lib/type';
import { tr } from 'zod/v4/locales';
import { FilesToCloud } from '@/lib/file';

export const appRouter = createTRPCRouter({
  // 1. Basic Echo Test
  hello: PublicBase
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
        time: new Date().toLocaleTimeString(),
      };
    }),

  // 2. Math Test (Validates Zod inputs)
  add: PublicBase
    .input(z.object({
      a: z.number(),
      b: z.number()
    }))
    .mutation(({ input }) => {
      return { result: input.a + input.b };
    }),

  // 3. Async Test (Simulates a slow DB call)
  getLatestPost: PublicBase
    .query(async () => {
      // Simulate 2 second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        id: 1,
        title: "This data came from the server after a delay!",
      };
    }),


  SendMesage: PublicBase
    .input(ContactSchema)
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx
      let details: State<ContactIDType> = {
        stateType: 'error',
        message: 'something went wrong'
      };
      // send the Contactr to  me 

      // send the Contactr to the database
      const contact = await prisma.contact.create({
        data: {
          name: input.name,
          email: input.email,
          message: input.message,
          company: input.company
        },
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          company: true,
        }

      })

      if (contact) {
        details = {
          stateType: 'success',
          data: contact
        }
      }

      return details;

    }),

  getALlSendMesage: PrivateBase
    .query(async ({ ctx }) => {
      const { prisma } = ctx
      const contact = await prisma.contact.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          company: true,
          createdAt: true
        }
      })
      return contact;
    }),

  CreateProject: PrivateBase
    .input(ProjectSchema)
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx
      let details: State<ProjectIDType> = {
        stateType: 'error',
        message: 'something went wrong'
      };
      const  uploadedFiles = await FilesToCloud(input.files);
      // send the Contactr to  me 

      // send the Contactr to the database
      const project = await prisma.project.create({
        data: {
          title: input.title,
          description: input.description,
          link: input.link,
          technologies: input.technologies,
          gitHub: input.gitHub,
          
          files: {
            createMany: {
              data: uploadedFiles
            }
          },


        },
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          technologies: true,
          gitHub: true,
          files: {
            select: {
              id: true,
              name: true,
              type: true,
              size: true,
              path: true,
              createdAt: true,
              updatedAt: true,
              tags: true,
              link: true,
              mime: true
            }
          },

        }

      })

      if (project) {
        details = {
          stateType: 'success',
          data: project
        }
      }

      return details;

    }),

  getAllProject: PublicBase
    .query(async ({ ctx }) => {
      try {
        let details: State<projectsListViewType[]> = {
          stateType: 'error',
          message: 'something went wrong'
        };
        const { prisma } = ctx
        const projects = await prisma.project.findMany({
          select: {
            id: true,
            title: true,
            technologies: true,
            link: true,
            files:true,

          }
        })

        if (projects) {
          details = {
            stateType: 'success',
            data: projects.map((project) => {
              return {
                id: project.id,
                title: project.title,
                technologies: project.technologies,
                link: project.link,
                files: project.files.find((file) => file.type === 'image' && file.tags.includes('thumbnail_X')),

              }
            })
          }
        }

        return details;
      } catch (error) {

        return {
          stateType: 'error',
          message: 'something went wrong'
        }

      }
    }),
});

export type AppRouter = typeof appRouter;