"use client"
import ProjectCard from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/trpc'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FileUploadResult } from '@/lib/utils'
import { DeleteImages, UploadImageList } from '@/lib/supabase'
import { defaultProject, Project, projectSchema } from '@/lib/auth-schema'
import InputBox, { SelectBox, SelectorBox, TextAreaBox } from '@/components/inputBox'
import MultipleSelector from '@/components/MultipleSelector'
import { authClient } from '@/lib/auth-client'
import ImageDragDrop from '@/components/img'


interface ProjectModeProps {
    show: boolean;
    mode: "create" | "update"
}

interface ProjectModProps {
    config: ProjectModeProps;
    setConfig: React.Dispatch<React.SetStateAction<ProjectModeProps>>;
    onCreate?: () => void;
    onUpdate?: () => void;
    project: Project;
    setProjectInfo: React.Dispatch<React.SetStateAction<Project | null>>;
}


export default function Page() {
    const [ProjectMode, setProjectMode] = React.useState<ProjectModeProps>({
        show: false,
        mode: "create"
    })
    const [projectInfo, setProjectInfo] = React.useState<Project | null>(null);
    const { data: getProjectsShowcase, ...getProjectsRest } = api.getProjectsShowcase.useQuery({
        limit: 10,
        offset: 0,
    }
    )





    function onDeleteProject(id: string) {
        // Logic to delete a project
        console.log(`Project with ID ${id} deleted`);

    }

    return (
        <div className='flex flex-col m-auto max-w-[85rem] min-w-[85rem] min-h-screen relative'>

            <div className='flex justify-between items-center p-5  border-b-[0.4] border-b-blue-500/55 mb-4'>

                <Button
                    variant={"secondary"}
                    onClick={() => {

                        setProjectInfo(defaultProject); // Reset project info for new project creation
                        setProjectMode({ show: true, mode: "create" })
                    }}
                >
                    Add New Project
                </Button>

                <Button
                    variant="destructive"
                    onClick={() => {
                        // Logic to handle logout
                        console.log("Logout clicked");
                    }}
                >
                    Logout
                </Button>
            </div>


            <div className='flex flex-col flex-1  gap-2.5 '>
                <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                <p className='text-muted-foreground'>Manage your projects and settings here.</p>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        getProjectsShowcase && getProjectsShowcase.data ? (
                            getProjectsShowcase.data.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    onDelete={() => onDeleteProject(project.id)}
                                    tools={project.tools} // Assuming tools are not provided in the showcase
                                    devMode={true} // Assuming devMode is not applicable in the showcase
                                />
                            ))
                        ) : (
                            <p className='text-muted-foreground text-2xl'>No projects available.</p>
                        )
                    }

                </div>

            </div>


            {ProjectMode.show && projectInfo && (

                <ProjectMod
                    config={ProjectMode}
                    setConfig={setProjectMode}
                    onCreate={() => {
                        // Logic to handle project creation
                        console.log("Project created");
                    }}
                    onUpdate={() => {
                        // Logic to handle project update
                        console.log("Project updated");
                    }}
                    project={projectInfo} // Assuming a project object is passed here
                    setProjectInfo={setProjectInfo}

                />
            )}

        </div>
    )
}


function ProjectMod({ config, setConfig, setProjectInfo, project }: ProjectModProps) {
    // Logic for project creation or update modal
    const [images, setImages] = React.useState<FileUploadResult[]>([]);
    const Session = authClient.useSession();



    async function onSuccess() {
        if (!Session || !Session.data?.user.id) {
            toast.error("User session not found. Please log in.");
            return;
        }
        let uploadedImages: FileUploadResult[] = [];
        try {
            const vProject = await projectSchema.safeParseAsync(project);
            if (vProject.error?.errors) {
                vProject.error?.errors.forEach((error) => {
                    toast.error(`Validation error: ${error.message}`);
                });
                return;
            }
            const imagesToUpload = images.filter(img => !img.supabaseID || img.supabaseID === "");
            uploadedImages = await UploadImageList(imagesToUpload, Session.data?.user.id);
            const uploadedImageToCL = images.filter(img => img.supabaseID && img.supabaseID !== "")



        } catch (error) {
            console.error(`Error during project ${config.mode}:`, error);
            toast.error(`Failed to ${config.mode} project`);
            await DeleteImages(uploadedImages.map(img => img.supabaseID));




            if (config.mode === "create") {
                setProjectInfo(defaultProject); // Reset project info for new project creation
            } else if (config.mode === "update") {
                setProjectInfo(null); // Reset project info for update
            }

            setConfig({ ...config, show: false });

        }

        setConfig({ ...config, show: false });

    }
    return (
        <Dialog open={config.show} onOpenChange={(open) => {
            setConfig({ ...config, show: open });
            if (!open) {
                setProjectInfo(null); // Reset project info when dialog is closed
            }
        }}>

            <DialogContent className='min-w-4xl'>
                <DialogHeader>
                    <DialogTitle>
                        {config.mode === "create" ? "Create New Project" : "Update Project"}
                    </DialogTitle>
                    <DialogDescription className=' flex flex-col gap-3 p-6'>
                        <div className='flex flex-col gap-4'>
                            <InputBox
                                label="Project Title"
                                placeholder="Enter project title"
                                value={project.title}
                                onChange={(e) => setProjectInfo({ ...project, title: e })}
                            />
                            <InputBox
                                label="github Link"
                                placeholder="Enter GitHub link"
                                value={project.githubLink || ''}
                                onChange={(e) => setProjectInfo({ ...project, githubLink: e })}
                            />
                            <InputBox
                                label="Live Link"
                                placeholder="Enter live project link"
                                value={project.liveLink || ''}
                                onChange={(e) => setProjectInfo({ ...project, liveLink: e })}
                            />
                            <SelectBox
                                label=" is Public"
                                value={project.isPublic ? "true" : "false"}
                                onChange={(value) => setProjectInfo({ ...project, isPublic: value === "true" })}
                                options={[
                                    { value: "true", label: "Public" },
                                    { value: "false", label: "Private" }
                                ]}
                            />
                        </div>
                        <SelectorBox
                            label="Technologies Used"

                            value={(project.technologies)}
                            onChange={(value) => setProjectInfo({ ...project, technologies: value })}
                            options={[
                                { value: "React", label: "React" },
                                { value: "Next.js", label: "Next.js" },
                                { value: "Node.js", label: "Node.js" },
                                { value: "Express", label: "Express" },
                                { value: "MongoDB", label: "MongoDB" },
                                { value: "PostgreSQL", label: "PostgreSQL" },
                                { value: "Supabase", label: "Supabase" },
                                { value: "Tailwind CSS", label: "Tailwind CSS" },
                                { value: "Chakra UI", label: "Chakra UI" },
                            ]}
                            placeholder='Select technologies used in the project'
                        />
                        <TextAreaBox
                            label="Project Description"
                            value={project.description}
                            onChange={(e) => setProjectInfo({ ...project, description: e })}
                            placeholder="Enter project description"
                        />
                        <ImageDragDrop
                            images={images}
                            setImages={setImages}
                            DeleteImages={async (paths) => {
                                // Logic to delete images from Supabase
                                console.log("Deleting images:", paths);
                                await DeleteImages(paths);
                            }}

                        />









                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}



