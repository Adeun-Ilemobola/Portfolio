"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

/**
 * Represents a file uploaded through the component.
 */
export interface FileUploadResult {
  supabaseID: string;
  name: string;
  url: string;
  size: number; // in bytes
  type: string;
  lastModified: number;
}

interface ImageDropzoneProps {
  /**
   * A controlled list of files. If omitted, the component manages its own state.
   */
  files?: FileUploadResult[];
  /**
   * Fires whenever the file list changes (add or delete).
   */
  onFilesChange?: (files: FileUploadResult[]) => void;
  /** Optional additional className for outer wrapper */
  className?: string;
}

/**
 * Drag‑and‑drop image uploader with a subtle ✨space‑vibes aesthetic. 🛰️
 *
 * • Uses CSS Grid (auto‑fill) so thumbnails re‑flow but never span the whole screen.
 * • Host element is capped at max‑w‑4xl and centered (`mx-auto`) so it doesn’t stretch edge‑to‑edge.
 * • Translucent, glassy cards w/ star‑field gradient (white/5 → white/10 → white/5) keep the theme without looking heavy.
 * • Truncated names (`truncate`) + lightweight size label.
 * • Delete icon per card.
 */
export default function ImageDropzone({
  files: controlledFiles,
  onFilesChange,
  className,
}: ImageDropzoneProps) {
  const [internalFiles, setInternalFiles] = useState<FileUploadResult[]>([]);
  const files = controlledFiles ?? internalFiles;

  const updateFiles = (next: FileUploadResult[]) => {
    if (onFilesChange) onFilesChange(next);
    else setInternalFiles(next);
  };

  const onDrop = useCallback<(accepted: File[]) => void>(acceptedFiles => {
    const mapped = acceptedFiles.map<FileUploadResult>(file => ({
      supabaseID: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
    updateFiles([...files, ...mapped]);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  const deleteFile = (id: string) => updateFiles(files.filter(f => f.supabaseID !== id));

  return (
    <section className={clsx("w-full max-w-4xl mx-auto space-y-6", className)}>
      {/* Drop area */}
      <div
        {...getRootProps()}
        className={clsx(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition backdrop-blur-md",
          isDragActive
            ? "border-indigo-300/60 bg-indigo-300/10"
            : "border-white/20 bg-white/5 hover:bg-white/10"
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm md:text-base select-none">
          {isDragActive ? "Drop the images here …" : "Drag & drop images, or click to browse"}
        </p>
      </div>

      {/* Thumbnails */}
      {files.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {files.map(file => (
            <Card
              key={file.supabaseID}
              className="group rounded-xl border border-white/10 bg-gradient-to-b from-white/5 via-white/10 to-white/5 shadow-sm backdrop-blur-lg"
            >
              <CardContent className="relative p-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteFile(file.supabaseID)}
                  className="absolute right-1 top-1 z-10 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-32 w-full rounded-t-xl object-cover"
                />
              </CardContent>
              <div className="flex items-center justify-between px-2 py-1">
                <span className="max-w-[8rem] truncate text-xs font-medium" title={file.name}>
                  {file.name}
                </span>
                <span className="text-[10px] text-white/60">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
