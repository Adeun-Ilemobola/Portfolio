import { any, z } from 'zod';
import { createTRPCRouter, PublicBase, PrivateBase } from './init';
import { Send } from 'lucide-react';
import { ContactIDType, ContactSchema, ProjectIDType, ProjectSchema, SkillSchema } from '@/lib/ZodObject';
import { projectsListViewType, State } from '@/lib/type';
import { tr } from 'zod/v4/locales';
import { FilesToCloud } from '@/lib/r2';
import { TRPCError } from '@trpc/server';
import { log } from 'console';

export const appRouter = createTRPCRouter({
  // 1. Basic Echo Test
  

  SendMesage: PublicBase
    .input(ContactSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { prisma } = ctx

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

        if (!contact) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "something went wrong",

          });

        }

        return {
          value: contact
        };

      } catch (error) {
        console.log("Contact error:", error);
        

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",

        });

      }

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
      try {
        const { prisma } = ctx
     
      const uploadedFiles = await FilesToCloud(input.files);
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

      if (!project) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",

        });

      }

      return {
        value: project
      };
        
      } catch (error) {
        console.log("Project error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",

        });
        
      }     
    }),

  getAllProject: PublicBase
    .query(async ({ ctx }) => {
      try {

        const { prisma } = ctx
        const projects = await prisma.project.findMany({
          include: {
            files: true
          }
        })

        return {
          value: projects
        };
      } catch (error) {

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",

        });

      }
    }),
    
    getSills: PublicBase
    .query(async ({ ctx }) => {
      try {

        const { prisma } = ctx
        const skills = await prisma.skill.findMany({
          
        })

        return {
          value: skills
        };
      } catch (error) {
        console.log("Skill fetch error:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",

        });

      }
    }),

    AddSkill: PrivateBase
    .input(SkillSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { prisma } = ctx
        const skill = await prisma.skill.create({
          data: {...input},
        })

        if (!skill) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "something went wrong",
          });
        }
        return {
          value: skill
        };
      } catch (error) {
        console.log("Add Skill error:", error);
        

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",

        });

      }

    }),

    RemoveSkill: PrivateBase
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { prisma } = ctx
        const skill = await prisma.skill.delete({
          where: { id: input.id },
        })

        if (!skill) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "something went wrong",
          });
        }
        return {
          value: skill
        };
      } catch (error) {
        console.log("Remove Skill error:", error);
        

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",

        });

      }

    }),



});

export type AppRouter = typeof appRouter;