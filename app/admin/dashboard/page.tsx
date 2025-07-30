"use client"
import ProjectCard from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/trpc'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { FileUploadResult } from '@/lib/utils'
import { DeleteImages, UploadImageList } from '@/lib/supabase'
import { About, aboutCreateSchema, aboutSchema, defaultAbout, defaultProject, Image, Project, projectSchema } from '@/lib/auth-schema'
import InputBox, { SelectBox, SelectorBox, TextAreaBox } from '@/components/inputBox'
import { authClient } from '@/lib/auth-client'
import ImageDragDrop from '@/components/img'
import { LoaderCircle, PackagePlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

import SpaceLoadingScreen from '@/components/LoadingScreen'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import FallBack from '@/components/FallBack'


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
    reFresh: () => void
    setImages: React.Dispatch<React.SetStateAction<FileUploadResult[]>>
    images: FileUploadResult[]
}
export default function Page() {
    const navigate = useRouter();
    const [ProjectMode, setProjectMode] = React.useState<ProjectModeProps>({
        show: false,
        mode: "create"
    })
    const LogOut = useMutation({
        mutationFn: async () => {
            try {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess(context) {
                            console.log('Logout successful', context);
                            toast.success('Logout successful');
                            navigate.push('/');
                        },
                        onError(context) {
                            console.error('Logout failed', context);
                            toast.error('Logout failed');
                        },
                    }
                })
            } catch (error) {
                console.error('Logout failed:', error);
                throw error; // Re-throw to let useMutation handle it
            }
        }
    })
    const [showaboutRecord, setshowAboutRecord] = React.useState(false);
    const [projectInfo, setProjectInfo] = React.useState<Project | null>(null);
    const [images, setImages] = React.useState<FileUploadResult[]>([]);

    const fechProjects = api.getProjectById.useMutation({
        onMutate: () => {
            toast.loading('Fetching project...', { id: 'project' });
        },

        onSuccess: (data) => {
            const { data: item } = data;

            console.log(data);
            if (data.success && item && item.project) {
                const project = item.project;
                const images = item.images.map((img) => ({
                    supabaseID: img.supabaseID,
                    name: img.name,
                    url: img.url,
                    size: img.size,
                    type: img.type,
                    lastModified: new Date(img.lastModified).getMilliseconds(),
                }));
                setImages(images);

                setProjectInfo({
                    ...project,
                    createdAt: new Date(project.createdAt),
                    updatedAt: new Date(project.updatedAt),
                    githubLink: project.githubLink || "",
                    liveLink: project.liveLink || "",

                });
                toast.success(data.message, { id: 'project' });
                setProjectMode({ show: true, mode: "update" });

            } else {
                toast.error(data.message, { id: 'project' });
            }

        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message, { id: 'project' });
        }
    })
    const { data: getProjectsShowcase, ...getProjectsRest } = api.getProjectsShowcase.useQuery({
        limit: 10,
        offset: 0,
    }
    )

    const delProject = api.deleteProject.useMutation({
        onMutate: () => {
            toast.loading('Deleting project...', { id: 'project' });
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.value, { id: 'project' });
                getProjectsRest.refetch();
                
            } else {
                toast.error(data.value, { id: 'project' });
            }
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message, { id: 'project' });
        }
    })
    function onDeleteProject(id: string) {
        // Logic to delete a project
        console.log(`Project with ID ${id} deleted`);
        delProject.mutate({ id: id });

    }
    function onEditProject(id: string) {
        // Logic to edit a project
        console.log(`Project with ID ${id} edited`);
        fechProjects.mutate({ id: id });


    }

    return (

        <FallBack loading={getProjectsRest.isLoading || fechProjects.isPending} >
            <div className='flex flex-col m-auto max-w-[85rem] min-w-[85rem] min-h-screen relative'>

                <div className='flex justify-end gap-2.5 items-center p-5  border-b-[0.4] border-b-blue-500/55 mb-4'>

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
                        variant={"secondary"}
                        onClick={() => {
                            setProjectMode(pre => ({ ...pre, show: false, }));
                            setshowAboutRecord(true);
                        }}
                    >
                        add/update about record
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            // Logic to handle logout
                            LogOut.mutate();

                        }}
                    >
                        Logout
                    </Button>
                </div>

                <div className='flex flex-col flex-1 h-full  gap-2.5 '>
                    <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                    <p className='text-muted-foreground'>Manage your projects and settings here.</p>

                    <div className='flex flex-row flex-wrap gap-4 flex-1'>
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
                                        onEdit={() => onEditProject(project.id)}
                                    />
                                ))
                            ) : (
                                <SpaceLoadingScreen fullScreen={false} />
                            )
                        }

                    </div>

                </div>


                {ProjectMode.show && projectInfo && (

                    <ProjectMod
                        config={ProjectMode}
                        setConfig={setProjectMode}
                        setImages={setImages}
                        images={images}
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
                        reFresh={() => { 
                            getProjectsRest.refetch() 
                            
                        }}

                    />
                )}


                <AboutRecord
                    setshowAboutRecord={setshowAboutRecord}
                    showaboutRecord={showaboutRecord}
                />


            </div>
        </FallBack>
    )
}

function ProjectMod({ config, setConfig, setProjectInfo, project, reFresh, setImages, images }: ProjectModProps) {
    // Logic for project creation or update modal
    const [isUploading, setUploading] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);


    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const Session = authClient.useSession();
    const createProject = api.createProject.useMutation({
        onSuccess(data, variables) {
            if (data.success) {
                toast.success(data.meg)
                setConfig({ ...config, show: false });
                reFresh();
            } else if (!data.success) {
                toast.error(data.meg);
                if (variables.images.length > 0) {
                    DeleteImages(variables.images.map(op => (op.supabaseID)))
                }
            }
            setUploading(false);
        },
        onError(error, variables) {
            toast.error(error.message);
            if (variables.images.length > 0) {
                DeleteImages(variables.images.map(op => (op.supabaseID)))
            }
            setUploading(false);
        },
    })
    const removeImage = api.DelImages.useMutation({
        onMutate() {
            toast.loading("Removing image", { id: "removeImage" });
        },
        onSuccess() {
            toast.success("Image removed", { id: "removeImage" });
        },
        onError(error) {
            toast.error(error.message, { id: "removeImage" });
        },

    })
    const UpdateProject = api.updataProject.useMutation({
        onMutate() {
            toast.loading("Updating project", { id: "updateProject" });

        },
        onSuccess() {
            toast.success("Project updated", { id: "updateProject" });
            setConfig({ ...config, show: false });
            reFresh();
        },
        onError(error) {
            toast.error(error.message, { id: "updateProject" });
        },
        
    })
    const DisableInputs = createProject.isPending || isUploading;



    async function onSuccess() {
        setUploading(true);
        if (!Session || !Session.data?.user.id) {
            toast.error("User session not found. Please log in.");
            console.log("User session not found. Please log in.");

            setUploading(false);
            return;
        }
        let uploadedImages: FileUploadResult[] = [];
        try {
            const vProject = await projectSchema.safeParseAsync(project);
            if (vProject.error?.errors) {
                vProject.error?.errors.forEach((error) => {
                    toast.error(`Validation error: ${error.message}`);
                });
                setUploading(false);
                return;
            }
            console.log("Project validated successfully:", vProject.data);


            const imagesToUpload = images.filter(img => !img.supabaseID || img.supabaseID === "");
            uploadedImages = await UploadImageList(imagesToUpload, Session.data?.user.id);
            const uploadedImageToDB: Image[] = uploadedImages.map(img => ({
                ...img,
                id: "",
                projectId: "",
                lastModified: new Date(img.lastModified)
            }))


            if (config.mode === "create") {
                console.log("send data to create project", { project, uploadedImageToDB, images });
                createProject.mutate({
                    project: {
                        ...project,
                    },
                    images: [...uploadedImageToDB]
                })
               
                setProjectInfo(defaultProject); // Reset project info for new project creation
            } else if (config.mode === "update") {
                console.log("send data to update project", { project, uploadedImageToDB, images });
                UpdateProject.mutate({
                    project: {
                        ...project,
                    },
                    images: [...uploadedImageToDB]
                })
                setProjectInfo(null); // Reset project info for update

            }
            setUploading(false);



        } catch (error) {
            console.error(`Error during project ${config.mode}:`, error);
            toast.error(`Failed to ${config.mode} project`);
            if (uploadedImages.length > 0) {
                await DeleteImages(uploadedImages.map(img => img.supabaseID));
            }


        }
        setUploading(false);



    }
    return (
        <Dialog open={config.show} onOpenChange={(open) => {
            setConfig({ ...config, show: open });
            if (!open) {
                setProjectInfo(null); // Reset project info when dialog is closed
            }
        }}>

            <DialogContent className='min-w-4xl  ' suppressHydrationWarning>
                <DialogHeader>
                    <DialogTitle>
                        {config.mode === "create" ? "Create New Project" : "Update Project"}
                    </DialogTitle>
                    <div className='flex flex-col gap-2 p-3 min-h-40 max-h-100 overflow-y-auto'>

                        {isMounted && (<>
                            <div className='grid grid-cols-2 gap-3'>
                                <InputBox
                                    label="Project Title"
                                    placeholder="Enter project title"
                                    value={project.title}
                                    onChange={(e) => setProjectInfo({ ...project, title: e })}
                                    disabled={DisableInputs}
                                />
                                <InputBox
                                    label="github Link"
                                    placeholder="Enter GitHub link"
                                    value={project.githubLink || ''}
                                    onChange={(e) => setProjectInfo({ ...project, githubLink: e })}
                                    disabled={DisableInputs}
                                />
                                <InputBox
                                    label="Live Link"
                                    placeholder="Enter live project link"
                                    value={project.liveLink || ''}
                                    onChange={(e) => setProjectInfo({ ...project, liveLink: e })}
                                    disabled={DisableInputs}
                                />
                                <SelectBox
                                    label=" is Public"
                                    value={project.isPublic ? "true" : "false"}
                                    onChange={(value) => setProjectInfo({ ...project, isPublic: value === "true" })}
                                    options={[
                                        { value: "true", label: "Public" },
                                        { value: "false", label: "Private" }
                                    ]}
                                    disabled={DisableInputs}
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
                                disabled={DisableInputs}
                            />
                            <TextAreaBox
                                label="Project Description"
                                value={project.description}
                                onChange={(e) => setProjectInfo({ ...project, description: e })}
                                placeholder="Enter project description"
                                disabled={DisableInputs}
                            />

                            <ImageDragDrop
                                images={images}
                                setImages={setImages}
                                DeleteImages={async (paths, index) => {
                                    // Logic to delete images from Supabase
                                    if (paths.length > 0) {
                                        removeImage.mutate({ supabaseID: paths })
                                    } 
                                     setImages(prevImages => prevImages.filter((_, i) => i !== index));
                                }}


                            />


                            <Button
                                className='w-full'
                                onClick={() => {
                                    onSuccess();
                                }}
                                disabled={DisableInputs}
                            >
                                {config.mode === "create" ? (DisableInputs ? "Creating Project..." : "Create Project") : (DisableInputs ? "Updating Project..." : "Update Project")}
                            </Button>

                        </>
                        )}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}



interface aboutRecordProps {
    showaboutRecord: boolean
    setshowAboutRecord: React.Dispatch<React.SetStateAction<boolean>>

}

function AboutRecord({ showaboutRecord, setshowAboutRecord }: aboutRecordProps) {
    const [aboutRecordList, setaboutRecordList] = useState<About[]>([]);
    const [aboutRecord, setaboutRecord] = useState<About | null>(null);
    const [operationMode, setOperationMode] = useState<"create" | "update">("create");
    const getAllAboutRecords = api.getAllAboutRecord.useQuery({
        offset: 0,
        limit: 12,
    })


    const UpdateMut = api.updateAboutRecord.useMutation({
        onSuccess: () => {
            getAllAboutRecords.refetch();
        }
    });
    const CreateMut = api.createAboutRecord.useMutation({
        onSuccess: () => {
            getAllAboutRecords.refetch();
        }
    });
    const DeactivateMut = api.DeactivateAboutRecord.useMutation({
        onSuccess: () => {
            getAllAboutRecords.refetch();
        }
    });

    const DisableInputs = (aboutRecord === null) || UpdateMut.isPending || CreateMut.isPending || DeactivateMut.isPending;
    useEffect(() => {

        if (getAllAboutRecords.data?.record) {
            const records = getAllAboutRecords.data.record.map((record) => {
                return {
                    id: record.id,
                    content: record.content,
                    isPublic: record.isPublic,
                    createdAt: new Date(record.createdAt),
                    updatedAt: new Date(record.updatedAt),
                }
            })
            setaboutRecordList(records);
        }
    }, [getAllAboutRecords.data])




    async function DeactivateRecord() {
        const allRecordsToDeactivate = aboutRecordList.filter((record) => record.id !== aboutRecord?.id && record.isPublic).map((record) => record.id);
        if (allRecordsToDeactivate.length > 0) {
            await DeactivateMut.mutateAsync({ id: allRecordsToDeactivate });
        }
    }
    async function onSuccess() {
        if (operationMode === "create") {
            console.log(" create aboutRecord", aboutRecord);

            const vAboutRecord = await aboutCreateSchema.safeParseAsync({
                content: aboutRecord?.content || '',
                isPublic: aboutRecord?.isPublic || false
            });
            if (!vAboutRecord.success) {
                if (vAboutRecord.error.errors) {
                    vAboutRecord.error.errors.forEach((error) => {
                        toast.error(error.message);
                    });

                }
                return
            }
            await DeactivateRecord();
            const aboutSend = CreateMut.mutateAsync({ aboutRecord: vAboutRecord.data })
            toast.promise(aboutSend, {
                loading: 'Creating record…',
                success: 'Record created!',
                error: (err) => `Record creation failed: ${err.message}`,
            })
            // Logic to create a new record
            console.log("Creating record:", aboutRecord);
        } else if (operationMode === "update") {

            // Logic to update an existing record
            if (!aboutRecord) {
                toast.error("Please select a record to update");
                return
            }
            const vAboutRecord = await aboutSchema.safeParseAsync(aboutRecord)
            if (!vAboutRecord.success) {
                if (vAboutRecord.error.errors) {
                    vAboutRecord.error.errors.forEach((error) => {
                        toast.error(error.message);
                    });
                    console.error(vAboutRecord.error.errors);
                }
                return
            }
            await DeactivateRecord();
            const aboutSend = UpdateMut.mutateAsync({
                id: vAboutRecord.data.id,
                content: vAboutRecord.data.content,
                isPublic: vAboutRecord.data.isPublic,
            })
            toast.promise(aboutSend, {
                loading: 'Updating record…',
                success: 'Record updated!',
                error: (err) => `Record update failed: ${err.message}`,
            })
        }
    }
    return (
        <Dialog open={showaboutRecord} onOpenChange={(open) => {
            setshowAboutRecord(open);
            setaboutRecord(null);
        }}>
            <DialogContent className='min-w-4xl'>
                <DialogHeader>
                    <DialogTitle>
                        Add or Update About Record
                    </DialogTitle>
                    <DialogDescription >
                        <p className='text-[1.1rem]'>Please select a record to update or create a new one</p>

                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col gap-1'>
                    <h1 className='text-[1.1rem]'>Record history</h1>
                    <div className='flex flex-row gap-2 p-1.5 flex-1 items-center overflow-auto'>

                        <Button
                            onClick={() => {
                                setaboutRecord(defaultAbout);
                                setOperationMode("create");
                            }}

                        >
                            --<PackagePlus />--
                        </Button>

                        {getAllAboutRecords.isPending ?
                            (

                                <>
                                    <div className=' flex-1  w-full'>
                                        <span className='flex flex-row gap-2 items-center'>
                                            <LoaderCircle className='animate-spin' />
                                            <span className='text-[1rem]'>Loading...</span>
                                        </span>
                                    </div>
                                </>

                            )
                            : (
                                <>
                                    {aboutRecordList.map((record) => (

                                        <Button
                                            key={record.id}
                                            variant={record.isPublic ? "default" : "secondary"}
                                            className={
                                                aboutRecord?.id === record.id ? "text-fuchsia-800" : ""
                                            }
                                            onClick={() => {
                                                setaboutRecord(record);
                                                setOperationMode("update");
                                            }}
                                        >
                                            {record.createdAt.toLocaleString()}
                                        </Button>

                                    ))}
                                </>
                            )
                        }





                    </div>
                </div>
                {aboutRecord ? (
                    <>
                        <TextAreaBox
                            label={
                                <div className='flex flex-row gap-2.5 items-center p-1.5'>
                                    <p className='text-[1rem]'>Record Description</p>
                                    <Badge variant={aboutRecord.isPublic ? "public" : "private"} size="sm">
                                        {aboutRecord.isPublic ? "Public" : "Private"}
                                    </Badge>
                                </div>
                            }
                            value={aboutRecord.content}
                            onChange={(e) => setaboutRecord({ ...aboutRecord, isPublic: true, content: e, updatedAt: new Date() })}
                            placeholder="Enter record description"
                            disabled={DisableInputs}
                            className='flex-1 min-h-[20rem]'
                        />

                        <Button
                            className='w-full'
                            onClick={() => {
                                onSuccess();
                            }}
                            disabled={DisableInputs}
                        >
                            {operationMode === "create" ? (DisableInputs ? "Creating Record..." : "Create Record") : (DisableInputs ? "Updating Record..." : "Update Record")}
                        </Button>

                    </>

                ) : (
                    <>
                        <div className='flex flex-col gap-2 p-1.5 justify-center items-center flex-1'>
                            <h1>No Record Selected or Created</h1>
                            <Button
                                onClick={() => {
                                    setaboutRecord(defaultAbout);
                                    setOperationMode("create");
                                }}
                            >
                                --<PackagePlus />--
                            </Button>
                        </div>

                    </>

                )

                }

            </DialogContent>



        </Dialog>
    )

}

