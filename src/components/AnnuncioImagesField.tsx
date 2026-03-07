"use client";

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { GripVertical, ImagePlus, Link2, Trash2, Upload } from 'lucide-react';

type PreviewFile = {
  id: string;
  file: File;
  previewUrl: string;
};

type AnnuncioImagesFieldProps = {
  label?: string;
  initialImages?: string[];
  initialManualUrlsText?: string;
};

function getFileSignature(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function buildPreviewFile(file: File): PreviewFile {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

function syncInputFiles(input: HTMLInputElement | null, files: File[]) {
  if (!input) return;

  const transfer = new DataTransfer();
  files.forEach((file) => transfer.items.add(file));
  input.files = transfer.files;
}

function normalizeTextUrls(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AnnuncioImagesField({
  label = 'Galleria immagini',
  initialImages = [],
  initialManualUrlsText = '',
}: AnnuncioImagesFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const newFilesRef = useRef<PreviewFile[]>([]);
  const [existingImages, setExistingImages] = useState(initialImages);
  const [manualUrlsText, setManualUrlsText] = useState(initialManualUrlsText);
  const [newFiles, setNewFiles] = useState<PreviewFile[]>([]);

  useEffect(() => {
    newFilesRef.current = newFiles;
  }, [newFiles]);

  useEffect(() => {
    return () => {
      newFilesRef.current.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    };
  }, []);

  const manualUrls = useMemo(() => normalizeTextUrls(manualUrlsText), [manualUrlsText]);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    setNewFiles((currentFiles) => {
      const existingSignatures = new Set(currentFiles.map((item) => getFileSignature(item.file)));
      const appendedFiles = selectedFiles
        .filter((file) => !existingSignatures.has(getFileSignature(file)))
        .map((file) => buildPreviewFile(file));

      const nextFiles = [...currentFiles, ...appendedFiles];
      syncInputFiles(inputRef.current, nextFiles.map((item) => item.file));
      return nextFiles;
    });

    event.target.value = '';
  };

  const removeExistingImage = (imageUrl: string) => {
    setExistingImages((current) => current.filter((url) => url !== imageUrl));
  };

  const removeManualUrl = (indexToRemove: number) => {
    const nextUrls = manualUrls.filter((_, index) => index !== indexToRemove);
    setManualUrlsText(nextUrls.join('\n'));
  };

  const removeNewFile = (previewId: string) => {
    setNewFiles((current) => {
      const nextFiles = current.filter((file) => file.id !== previewId);
      const removedFile = current.find((file) => file.id === previewId);
      if (removedFile) {
        URL.revokeObjectURL(removedFile.previewUrl);
      }
      syncInputFiles(inputRef.current, nextFiles.map((item) => item.file));
      return nextFiles;
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-primary/10 bg-primary/5 p-4 sm:p-5">
      <div>
        <label className="block text-sm font-medium text-secondary mb-1">{label}</label>
        <p className="text-xs text-secondary/60">
          La prima immagine disponibile diventa copertina. Puoi caricare più file o incollare più URL, uno per riga.
        </p>
      </div>

      <input type="hidden" name="existing_image_urls" value={JSON.stringify(existingImages)} />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          onClick={() => inputRef.current?.click()}
          className="relative min-h-[180px] rounded-2xl border-2 border-dashed border-primary/20 bg-white/80 px-5 py-8 text-center transition-colors hover:border-primary/40 hover:bg-white cursor-pointer"
        >
          <input
            ref={inputRef}
            type="file"
            name="immagini"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFilesChange}
            className="sr-only"
          />
          <div className="flex h-full flex-col items-center justify-center gap-3 text-secondary/75">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Upload className="h-7 w-7" />
            </div>
            <div>
              <p className="font-semibold text-secondary">Carica immagini da PC</p>
              <p className="text-sm text-secondary/60">JPG, PNG, WebP · max 5MB per file</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="manual_image_urls" className="block text-xs font-medium text-secondary/70">
            URL immagini esterne
          </label>
          <textarea
            id="manual_image_urls"
            name="manual_image_urls"
            rows={8}
            value={manualUrlsText}
            onChange={(event) => setManualUrlsText(event.target.value)}
            placeholder="https://...\nhttps://..."
            className="w-full rounded-2xl border border-primary/15 bg-white px-3 py-3 text-sm text-secondary placeholder:text-secondary/35 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-secondary/55">
            Usa questo campo per immagini già pubblicate su R2 o da importare manualmente.
          </p>
        </div>
      </div>

      {(existingImages.length > 0 || manualUrls.length > 0 || newFiles.length > 0) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-secondary">
            <GripVertical className="h-4 w-4 text-primary/70" />
            Anteprima galleria
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {existingImages.map((imageUrl, index) => (
              <PreviewCard
                key={`existing-${imageUrl}`}
                imageUrl={imageUrl}
                title={`Immagine salvata ${index + 1}`}
                badge={index === 0 ? 'Copertina attuale' : 'Salvata'}
                icon={<ImagePlus className="h-4 w-4" />}
                onRemove={() => removeExistingImage(imageUrl)}
              />
            ))}

            {manualUrls.map((imageUrl, index) => (
              <PreviewCard
                key={`manual-${imageUrl}-${index}`}
                imageUrl={imageUrl}
                title={`URL manuale ${index + 1}`}
                badge={existingImages.length === 0 && index === 0 ? 'Copertina nuova' : 'URL manuale'}
                icon={<Link2 className="h-4 w-4" />}
                onRemove={() => removeManualUrl(index)}
              />
            ))}

            {newFiles.map((file, index) => (
              <PreviewCard
                key={file.id}
                imageUrl={file.previewUrl}
                title={file.file.name}
                badge={existingImages.length === 0 && manualUrls.length === 0 && index === 0 ? 'Copertina nuova' : 'Nuovo upload'}
                icon={<Upload className="h-4 w-4" />}
                onRemove={() => removeNewFile(file.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewCard({
  imageUrl,
  title,
  badge,
  icon,
  onRemove,
}: {
  imageUrl: string;
  title: string;
  badge: string;
  icon: ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-primary/5">
        <Image src={imageUrl} alt={title} fill unoptimized className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
      </div>
      <div className="flex items-start justify-between gap-3 p-3">
        <div className="min-w-0">
          <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            {icon}
            {badge}
          </div>
          <p className="truncate text-sm font-medium text-secondary">{title}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 text-secondary/65 transition-colors hover:bg-red-50 hover:text-red-600"
          aria-label={`Rimuovi ${title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
