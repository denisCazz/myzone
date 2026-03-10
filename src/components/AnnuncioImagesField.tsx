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

type PreviewItem = {
  key: string;
  token: string;
  imageUrl: string;
  title: string;
  badge: string;
  icon: ReactNode;
  onRemove: () => void;
};

type AnnuncioImagesFieldProps = {
  label?: string;
  initialImages?: string[];
  initialManualUrlsText?: string;
  initialImageOrderSelectionsText?: string;
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

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) return items;

  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
}

function parseInitialImageOrderSelections(value: string | undefined, fallbackImages: string[]) {
  if (!value) {
    return fallbackImages.map((imageUrl) => createUrlCoverSelection(imageUrl));
  }

  try {
    const parsedValue = JSON.parse(value);
    if (!Array.isArray(parsedValue)) {
      return fallbackImages.map((imageUrl) => createUrlCoverSelection(imageUrl));
    }

    return parsedValue.filter(
      (item): item is string =>
        typeof item === 'string' &&
        (item.startsWith('url:') || item.startsWith('upload:')),
    );
  } catch {
    return fallbackImages.map((imageUrl) => createUrlCoverSelection(imageUrl));
  }
}

export default function AnnuncioImagesField({
  label = 'Galleria immagini',
  initialImages = [],
  initialManualUrlsText = '',
  initialImageOrderSelectionsText,
}: AnnuncioImagesFieldProps) {
  const pickerInputRef = useRef<HTMLInputElement>(null);
  const submitInputRef = useRef<HTMLInputElement>(null);
  const newFilesRef = useRef<PreviewFile[]>([]);
  const [existingImages, setExistingImages] = useState(initialImages);
  const [manualUrlsText, setManualUrlsText] = useState(initialManualUrlsText);
  const [newFiles, setNewFiles] = useState<PreviewFile[]>([]);
  const [imageOrderSelections, setImageOrderSelections] = useState<string[]>(() =>
    parseInitialImageOrderSelections(initialImageOrderSelectionsText, initialImages),
  );
  const [draggedToken, setDraggedToken] = useState<string | null>(null);
  const [dropTargetToken, setDropTargetToken] = useState<string | null>(null);

  const manualUrls = useMemo(() => normalizeTextUrls(manualUrlsText), [manualUrlsText]);
  const availableSelections = useMemo(
    () => [
      ...existingImages.map((imageUrl) => createUrlCoverSelection(imageUrl)),
      ...manualUrls.map((imageUrl) => createUrlCoverSelection(imageUrl)),
      ...newFiles.map((file) => createUploadCoverSelection(file.file)),
    ],
    [existingImages, manualUrls, newFiles],
  );

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

  useEffect(() => {
    setImageOrderSelections((currentSelections) => {
      const availableSet = new Set(availableSelections);
      const nextSelections = currentSelections.filter((selection) => availableSet.has(selection));

      availableSelections.forEach((selection) => {
        if (!nextSelections.includes(selection)) {
          nextSelections.push(selection);
        }
      });

      const unchanged =
        currentSelections.length === nextSelections.length &&
        currentSelections.every((selection, index) => selection === nextSelections[index]);

      return unchanged ? currentSelections : nextSelections;
    });
  }, [availableSelections]);

  const coverSelection = useMemo(
    () => imageOrderSelections[0] || getFallbackCoverSelection(existingImages, manualUrls, newFiles),
    [existingImages, imageOrderSelections, manualUrls, newFiles],
  );

  const previewItems = useMemo(() => {
    const items: PreviewItem[] = [
      ...existingImages.map((imageUrl, index) => ({
        key: `existing-${imageUrl}`,
        token: createUrlCoverSelection(imageUrl),
        imageUrl,
        title: `Immagine salvata ${index + 1}`,
        badge: 'Salvata',
        icon: <ImagePlus className="h-4 w-4" />,
        onRemove: () => removeExistingImage(imageUrl),
      })),
      ...manualUrls.map((imageUrl, index) => ({
        key: `manual-${imageUrl}-${index}`,
        token: createUrlCoverSelection(imageUrl),
        imageUrl,
        title: `URL manuale ${index + 1}`,
        badge: 'URL manuale',
        icon: <Link2 className="h-4 w-4" />,
        onRemove: () => removeManualUrl(index),
      })),
      ...newFiles.map((file) => ({
        key: file.id,
        token: createUploadCoverSelection(file.file),
        imageUrl: file.previewUrl,
        title: file.file.name,
        badge: 'Nuovo upload',
        icon: <Upload className="h-4 w-4" />,
        onRemove: () => removeNewFile(file.id),
      })),
    ];

    const itemsByToken = new Map(items.map((item) => [item.token, item]));
    const orderedItems: PreviewItem[] = [];
    const addedTokens = new Set<string>();

    imageOrderSelections.forEach((selection) => {
      const item = itemsByToken.get(selection);
      if (item && !addedTokens.has(selection)) {
        orderedItems.push(item);
        addedTokens.add(selection);
      }
    });

    items.forEach((item) => {
      if (!addedTokens.has(item.token)) {
        orderedItems.push(item);
        addedTokens.add(item.token);
      }
    });

    return orderedItems;
  }, [existingImages, imageOrderSelections, manualUrls, newFiles]);

  const movePreviewItemToFront = (token: string) => {
    setImageOrderSelections((currentSelections) => {
      const currentIndex = currentSelections.indexOf(token);
      if (currentIndex <= 0) {
        return currentSelections;
      }

      return [token, ...currentSelections.filter((selection) => selection !== token)];
    });
  };

  const reorderPreviewItems = (dragToken: string, targetToken: string) => {
    if (!dragToken || !targetToken || dragToken === targetToken) {
      return;
    }

    setImageOrderSelections((currentSelections) => {
      const currentIndex = currentSelections.indexOf(dragToken);
      const targetIndex = currentSelections.indexOf(targetToken);

      if (currentIndex < 0 || targetIndex < 0 || currentIndex === targetIndex) {
        return currentSelections;
      }

      return moveItem(currentSelections, currentIndex, targetIndex);
    });
  };

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
          Puoi riordinare tutte le foto. La prima immagine diventa automaticamente la copertina.
        </p>
      </div>

      <input type="hidden" name="existing_image_urls" value={JSON.stringify(existingImages)} />
      <input type="hidden" name="cover_image_selection" value={coverSelection} />
      <input type="hidden" name="image_order_selections" value={JSON.stringify(imageOrderSelections)} />
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
            {previewItems.map((item, index) => (
              <PreviewCard
                key={item.key}
                token={item.token}
                imageUrl={item.imageUrl}
                title={item.title}
                badge={index === 0 ? 'Copertina' : item.badge}
                icon={item.icon}
                isCover={index === 0}
                isDragging={draggedToken === item.token}
                isDropTarget={dropTargetToken === item.token && draggedToken !== item.token}
                onDragStart={() => {
                  setDraggedToken(item.token);
                  setDropTargetToken(item.token);
                }}
                onDragOver={() => {
                  if (draggedToken && draggedToken !== item.token) {
                    setDropTargetToken(item.token);
                  }
                }}
                onDrop={() => {
                  if (draggedToken) {
                    reorderPreviewItems(draggedToken, item.token);
                  }
                  setDraggedToken(null);
                  setDropTargetToken(null);
                }}
                onDragEnd={() => {
                  setDraggedToken(null);
                  setDropTargetToken(null);
                }}
                onSetCover={() => movePreviewItemToFront(item.token)}
                onRemove={item.onRemove}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewCard({
  token,
  imageUrl,
  title,
  badge,
  icon,
  isCover,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onSetCover,
  onRemove,
}: {
  token: string;
  imageUrl: string;
  title: string;
  badge: string;
  icon: ReactNode;
  isCover: boolean;
  isDragging: boolean;
  isDropTarget: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
  onSetCover: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', token);
        onDragStart();
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        onDragOver();
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      onDragEnd={onDragEnd}
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${
        isDragging
          ? 'border-primary/30 opacity-60 shadow-lg shadow-primary/10'
          : isDropTarget
          ? 'border-primary shadow-lg shadow-primary/15 ring-2 ring-primary/15'
          : 'border-primary/15'
      }`}
    >
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
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-secondary/70">
            <GripVertical className="h-3.5 w-3.5 text-primary/70" />
            Trascina per riordinare
          </div>
          <p className="truncate text-sm font-semibold text-secondary">{title}</p>
        </div>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={onSetCover}
            className={`flex w-full items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
              isCover
                ? 'border-primary/20 bg-primary text-white shadow-sm'
                : 'border-primary/20 bg-white text-secondary hover:bg-primary/5'
            }`}
          >
            {isCover ? 'Copertina' : 'Metti per prima'}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex w-full items-center justify-center gap-1 rounded-xl border border-primary/20 bg-white px-2 py-2 text-xs font-medium text-secondary transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label={`Rimuovi ${title}`}
          >
            <Trash2 className="h-4 w-4" />
            <span>Rimuovi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
