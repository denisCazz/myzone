"use client";

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { GripVertical, ImagePlus, Link2, Trash2, Upload } from 'lucide-react';
import {
  createUploadCoverSelection,
  createUrlCoverSelection,
  getFileSignature,
} from '@/lib/annuncio-images';

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

function getFallbackCoverSelection(existingImages: string[], manualUrls: string[], newFiles: PreviewFile[]) {
  if (existingImages[0]) return createUrlCoverSelection(existingImages[0]);
  if (manualUrls[0]) return createUrlCoverSelection(manualUrls[0]);
  if (newFiles[0]) return createUploadCoverSelection(newFiles[0].file);
  return '';
}

export default function AnnuncioImagesField({
  label = 'Galleria immagini',
  initialImages = [],
  initialManualUrlsText = '',
}: AnnuncioImagesFieldProps) {
  const pickerInputRef = useRef<HTMLInputElement>(null);
  const submitInputRef = useRef<HTMLInputElement>(null);
  const newFilesRef = useRef<PreviewFile[]>([]);
  const [existingImages, setExistingImages] = useState(initialImages);
  const [manualUrlsText, setManualUrlsText] = useState(initialManualUrlsText);
  const [newFiles, setNewFiles] = useState<PreviewFile[]>([]);
  const [selectedCoverSelection, setSelectedCoverSelection] = useState(() =>
    getFallbackCoverSelection(initialImages, [], []),
  );

  const manualUrls = useMemo(() => normalizeTextUrls(manualUrlsText), [manualUrlsText]);

  useEffect(() => {
    newFilesRef.current = newFiles;
  }, [newFiles]);

  useEffect(() => {
    syncInputFiles(submitInputRef.current, newFiles.map((item) => item.file));
  }, [newFiles]);

  useEffect(() => {
    return () => {
      newFilesRef.current.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    };
  }, []);

  const coverSelection = useMemo(() => {
    const availableCoverSelections = new Set([
      ...existingImages.map((imageUrl) => createUrlCoverSelection(imageUrl)),
      ...manualUrls.map((imageUrl) => createUrlCoverSelection(imageUrl)),
      ...newFiles.map((file) => createUploadCoverSelection(file.file)),
    ]);

    if (selectedCoverSelection && availableCoverSelections.has(selectedCoverSelection)) {
      return selectedCoverSelection;
    }

    return getFallbackCoverSelection(existingImages, manualUrls, newFiles);
  }, [existingImages, manualUrls, newFiles, selectedCoverSelection]);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    setNewFiles((currentFiles) => {
      const existingSignatures = new Set(currentFiles.map((item) => getFileSignature(item.file)));
      const appendedFiles = selectedFiles
        .filter((file) => !existingSignatures.has(getFileSignature(file)))
        .map((file) => buildPreviewFile(file));

      return [...currentFiles, ...appendedFiles];
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
      return nextFiles;
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-primary/10 bg-primary/5 p-4 sm:p-5">
      <div>
        <label className="block text-sm font-medium text-secondary mb-1">{label}</label>
        <p className="text-xs text-secondary/60">
          Puoi scegliere manualmente la copertina. Carica piu file o incolla piu URL, uno per riga.
        </p>
      </div>

      <input type="hidden" name="existing_image_urls" value={JSON.stringify(existingImages)} />
      <input type="hidden" name="cover_image_selection" value={coverSelection} />
      <input
        ref={submitInputRef}
        type="file"
        name="immagini"
        accept="image/jpeg,image/png,image/webp"
        multiple
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          onClick={() => pickerInputRef.current?.click()}
          className="relative min-h-[180px] rounded-2xl border-2 border-dashed border-primary/20 bg-white/80 px-5 py-8 text-center transition-colors hover:border-primary/40 hover:bg-white cursor-pointer"
        >
          <input
            ref={pickerInputRef}
            type="file"
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
            Usa questo campo per immagini gia pubblicate su R2 o da importare manualmente.
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
            {existingImages.map((imageUrl, index) => {
              const isCover = coverSelection === createUrlCoverSelection(imageUrl);

              return (
                <PreviewCard
                  key={`existing-${imageUrl}`}
                  imageUrl={imageUrl}
                  title={`Immagine salvata ${index + 1}`}
                  badge={isCover ? 'Copertina' : 'Salvata'}
                  icon={<ImagePlus className="h-4 w-4" />}
                  isCover={isCover}
                  onSetCover={() => setSelectedCoverSelection(createUrlCoverSelection(imageUrl))}
                  onRemove={() => removeExistingImage(imageUrl)}
                />
              );
            })}

            {manualUrls.map((imageUrl, index) => {
              const isCover = coverSelection === createUrlCoverSelection(imageUrl);

              return (
                <PreviewCard
                  key={`manual-${imageUrl}-${index}`}
                  imageUrl={imageUrl}
                  title={`URL manuale ${index + 1}`}
                  badge={isCover ? 'Copertina' : 'URL manuale'}
                  icon={<Link2 className="h-4 w-4" />}
                  isCover={isCover}
                  onSetCover={() => setSelectedCoverSelection(createUrlCoverSelection(imageUrl))}
                  onRemove={() => removeManualUrl(index)}
                />
              );
            })}

            {newFiles.map((file) => {
              const isCover = coverSelection === createUploadCoverSelection(file.file);

              return (
                <PreviewCard
                  key={file.id}
                  imageUrl={file.previewUrl}
                  title={file.file.name}
                  badge={isCover ? 'Copertina' : 'Nuovo upload'}
                  icon={<Upload className="h-4 w-4" />}
                  isCover={isCover}
                  onSetCover={() => setSelectedCoverSelection(createUploadCoverSelection(file.file))}
                  onRemove={() => removeNewFile(file.id)}
                />
              );
            })}
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
  isCover,
  onSetCover,
  onRemove,
}: {
  imageUrl: string;
  title: string;
  badge: string;
  icon: ReactNode;
  isCover: boolean;
  onSetCover: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-primary/5">
        <Image src={imageUrl} alt={title} fill unoptimized className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
      </div>
      <div className="border-t border-primary/10 bg-slate-50/90 p-3.5">
        <div className="min-w-0">
          <div
            className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isCover ? 'bg-primary text-white' : 'bg-secondary/10 text-secondary'
            }`}
          >
            {icon}
            {badge}
          </div>
          <p className="truncate text-sm font-semibold text-secondary">{title}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onSetCover}
            className={`min-w-0 flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
              isCover
                ? 'border-primary/20 bg-primary text-white shadow-sm'
                : 'border-primary/20 bg-white text-secondary hover:bg-primary/5'
            }`}
          >
            {isCover ? 'Copertina' : 'Metti copertina'}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-white text-secondary/80 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label={`Rimuovi ${title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
