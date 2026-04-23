"use client";

import Image from "next/image";
import { type ChangeEvent, useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type PhotoUploadProps = {
  authEnabled: boolean;
  vendorId: string;
  photoUrl?: string | null;
  error?: string;
  onUploaded: (url: string | null | undefined, message: string) => void;
};

const maxFileSizeBytes = 2 * 1024 * 1024;

export function PhotoUpload({ authEnabled, vendorId, photoUrl, error, onUploaded }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_VENDOR_PHOTOS_BUCKET || "vendor-photos";

  async function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!authEnabled) {
      onUploaded(undefined, "Photo upload needs Supabase env vars and a signed-in vendor.");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      onUploaded(undefined, "Use a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > maxFileSizeBytes) {
      onUploaded(undefined, "Photo must be 2MB or smaller.");
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      onUploaded(undefined, "Supabase client is not configured.");
      return;
    }

    setIsUploading(true);

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${vendorId.startsWith("draft-") ? "pending" : vendorId}/${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (uploadError) {
      onUploaded(undefined, "Upload failed. Make sure the storage bucket and policies are configured.");
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onUploaded(data.publicUrl, "Photo uploaded. Save changes to publish it on your profile.");
    setIsUploading(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Profile photo</h2>
          <p className="text-sm text-ink/65">Optional, but it helps customers recognize your stall.</p>
        </div>
        <Camera className="h-5 w-5 text-leaf" />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-3xl bg-clay">
          {photoUrl ? (
            <Image src={photoUrl} alt="Vendor profile" fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center bg-soil text-sm font-semibold text-white">
              No photo
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload photo"}
          </button>
          {photoUrl ? (
            <button
              type="button"
              onClick={() => onUploaded(null, "Photo removed locally. Save changes to update your profile.")}
              className="inline-flex items-center gap-2 rounded-2xl border border-clay bg-white px-4 py-3 text-sm font-semibold text-ink"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/55">Accepted formats: JPG, PNG, WEBP. Max size: 2MB.</p>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
