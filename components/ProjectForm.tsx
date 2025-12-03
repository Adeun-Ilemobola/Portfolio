"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// import { zodValidator } from '@tanstack/zod-form-adapter'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TooLInput from "./ToolInput";
import ImgList from "./ImgList";
import { FileX, ProjectSchema } from "@/lib/ZodObject";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
  
    FieldLabel,
   
} from "@/components/ui/field";
import { toast } from "sonner";
import { trpc as api } from "@/lib/client";
import { useState } from "react";
export function ProjectForm() {
    const [isLoading, setIsLoading] = useState(false);

    const createProject = api.CreateProject.useMutation({
        onMutate: () => {
            toast.loading("Creating project...", { id: "create-project" });
            setIsLoading(true);
        },
        onSuccess: (data) => {
            toast.success("Project created successfully!", {
                id: "create-project",
            });
            setIsLoading(false);
        },
        onError: (error) => {
            toast.error(
                `Failed to create project: ${error.message}`,
                { id: "create-project" },
            );
            setIsLoading(false);
        },

    });
    // 1. Define your form.
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            link: "",
            gitHub: "",
            technologies: [] as string[], // Initial state for ToolInput
            files: [] as FileX[], // Initial state for ImgList
        },

        validators: {
            onSubmit: ProjectSchema as any,
            // onChange: zodValidator(ProjectSchema),
            // onBlur: zodValidator(ProjectSchema),
        },
        onSubmit: (values) => {
            console.log("Form Submitted:", values);
            toast.success("Form submitted successfully!", {
                id: "project-success",
            });
        },
        onSubmitInvalid: (errors) => {
            console.log("Form Submission Errors:", errors);

            console.log("isValidating:", errors.formApi.state.isValidating);
            console.log("canSubmit:", errors.formApi.state.canSubmit);
            console.log(
                "allErrors:",
                errors.formApi.getAllErrors(),
            );
        },
        onSubmitMeta: (meta: any) => {
            console.log("Form Meta:", meta);
            toast.success("Form submitted successfully!", {
                id: "project-success",
            });
        },
    });

    return (
        <>
            <form
                id="bug-report-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="title"
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Title
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />
                                </FieldContent>
                                {isInvalid && (
                                    <FieldError>
                                        {field.state.meta.errors?.map(
                                            (error, index) => (
                                                <div key={index}>{error}</div>
                                            ),
                                        )}
                                    </FieldError>
                                )}
                            </Field>
                        );
                    }}
                />

                <form.Field
                    name="description"
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Description
                                </FieldLabel>
                                <FieldContent>
                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="Describe the project in detail..."
                                        autoComplete="off"
                                    />
                                </FieldContent>
                                {isInvalid && (
                                    <FieldError>
                                        {field.state.meta.errors?.map(
                                            (error, index) => (
                                                <div key={index}>{error}</div>
                                            ),
                                        )}
                                    </FieldError>
                                )}
                            </Field>
                        );
                    }}
                />

                <div className="grid grid-cols-2 gap-4" >
                    <form.Field
                        name="link"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Website link
                                    </FieldLabel>
                                    <FieldContent>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )}
                                            aria-invalid={isInvalid}
                                            placeholder="https://example.com"
                                            autoComplete="off"
                                        />
                                    </FieldContent>
                                    {isInvalid && (
                                        <FieldError>
                                            {field.state.meta.errors?.map(
                                                (error, index) => (
                                                    <div key={index}>
                                                        {error}
                                                    </div>
                                                ),
                                            )}
                                        </FieldError>
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <form.Field
                        name="gitHub"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Github link
                                    </FieldLabel>
                                    <FieldContent>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )}
                                            aria-invalid={isInvalid}
                                            placeholder="https://github.com/username/project"
                                            autoComplete="off"
                                        />
                                    </FieldContent>
                                    {isInvalid && (
                                        <FieldError>
                                            {field.state.meta.errors?.map(
                                                (error, index) => (
                                                    <div key={index}>
                                                        {error}
                                                    </div>
                                                ),
                                            )}
                                        </FieldError>
                                    )}
                                </Field>
                            );
                        }}
                    />
                </div>

                <form.Field name="technologies">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel>Technologies</FieldLabel>
                                <FieldContent>
                                    <div onBlur={field.handleBlur}>
                                        <TooLInput
                                            result={field.state.value ?? []}
                                            onUpdate={field.handleChange}
                                        />
                                    </div>
                                </FieldContent>

                                {isInvalid && (
                                    <FieldError>
                                        {field.state.meta.errors?.map((
                                            error,
                                            index,
                                        ) => <div key={index}>{error}</div>)}
                                    </FieldError>
                                )}
                            </Field>
                        );
                    }}
                </form.Field>

                <form.Field name="files">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        const files = field.state.value ?? [];

                        const removeFile = (file: FileX) => {
                            field.handleChange(files.filter((f) => f !== file));
                        };

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel>Project Media</FieldLabel>

                                {/* Make blur tracking work */}
                                <div onBlur={field.handleBlur}>
                                    <ImgList
                                        files={files}
                                        updataFiles={field.handleChange}
                                        removeFile={removeFile}
                                    />
                                </div>

                                {isInvalid && (
                                    <FieldError>
                                        {field.state.meta.errors?.map((
                                            err,
                                            i,
                                        ) => <div key={i}>{err}</div>)}
                                    </FieldError>
                                )}
                            </Field>
                        );
                    }}
                </form.Field>
                {/* DEBUGGING: Reveal hidden errors */}
                <div className="bg-red-100 p-4 mt-4 text-xs font-mono text-red-800 rounded">
                    <strong>Form Errors:</strong>
                    <pre>{JSON.stringify(form.state.errors, null, 2)}</pre>
                </div>

                <Button type="submit" className="mt-4">
                    Submit Project
                </Button>
            </form>
        </>
    );
}
