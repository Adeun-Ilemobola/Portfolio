import z from 'zod';


export const  ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
  company: z.string().nullable(),
});
export const  ContactSchemaID = ContactSchema.extend({ id: z.string() });
export type ContactType = z.infer<typeof ContactSchema>;
export type ContactIDType = z.infer<typeof ContactSchemaID>;





export const SkillSchema = z.object({
  name: z.string().min(1, "Skill name cannot be empty"),
  category: z.string().min(1, "Category cannot be empty"), 
  size: z.enum(["small", "medium", "large"]),
});

export type Skill = z.infer<typeof SkillSchema>;

export const FileXSchema = z.object({
    type: z.enum(['image', 'video', 'document', 'audio', 'other']),
    name : z.string(),
    size : z.number().nonnegative({ message: "File size must be a non-negative number" }),
    path : z.string(),// the path is the cloud storage path
    createdAt : z.date(),
    updatedAt : z.date(),
    tags : z.array(z.string()),
    link: z.string(),// base64 string or URL from cloud storage
});
export type FileX = z.infer<typeof FileXSchema>;

export const ProjectSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters long" }),
  link: z.url({ message: "Invalid URL format" }),
  technologies: z.array(z.string()).min(1, { message: "At least one technology must be specified" }),
  gitHub: z.url({ message: "Invalid GitHub URL format" }),
  files: z.array(FileXSchema),
  
}).superRefine((data, ctx) => {
  const hasValidImage = data.files.some((file) => file.type === 'image');
  const _hasValidVideo = data.files.some((file) => file.type === 'video');
  
  if (!hasValidImage) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "You must upload at least one image to showcase the project.",
      path: ["images"], // Highlights the 'images' input specifically
    });
  }
  // if (hasValidVideo && data.videos.type !== 'video') {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     message: "The selected file must be a video format.",
  //     path: ["videos"],
  //   });
  // }
});
export type ProjectType = z.infer<typeof ProjectSchema>;
const ProjectSchemaID = ProjectSchema.extend({ id: z.string() });
export type ProjectIDType = z.infer<typeof ProjectSchemaID>;



