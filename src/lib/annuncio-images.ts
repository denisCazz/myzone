export const MAX_ANNUNCIO_IMAGES = 12;

export type AnnuncioWithImages = {
  immagine_url?: string | null;
  immagini_urls?: string[] | null;
};

export const COVER_SELECTION_UPLOAD_PREFIX = 'upload:';
export const COVER_SELECTION_URL_PREFIX = 'url:';

type FileLike = {
  name: string;
  size: number;
  lastModified: number;
};

export function normalizeImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;

  const trimmedValue = value.trim();
  if (!trimmedValue) return null;

  try {
    const url = new URL(trimmedValue);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function normalizeImageUrls(values: Array<string | null | undefined>): string[] {
  const uniqueUrls = new Set<string>();

  values.forEach((value) => {
    const normalizedValue = normalizeImageUrl(value);
    if (normalizedValue) {
      uniqueUrls.add(normalizedValue);
    }
  });

  return Array.from(uniqueUrls);
}

export function parseImageUrlsFromText(text: string | null | undefined): string[] {
  if (!text) return [];

  return normalizeImageUrls(
    text
      .split(/\r?\n|,/)
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

export function parseExistingImagesJson(value: FormDataEntryValue | null): string[] {
  if (typeof value !== 'string' || !value.trim()) return [];

  try {
    const parsedValue = JSON.parse(value);
    if (!Array.isArray(parsedValue)) return [];

    return normalizeImageUrls(parsedValue.filter((item): item is string => typeof item === 'string'));
  } catch {
    return [];
  }
}

export function parseImageOrderSelectionsJson(value: FormDataEntryValue | null): string[] {
  if (typeof value !== 'string' || !value.trim()) return [];

  try {
    const parsedValue = JSON.parse(value);
    if (!Array.isArray(parsedValue)) return [];

    const uniqueSelections = new Set<string>();

    parsedValue.forEach((item) => {
      if (
        typeof item === 'string' &&
        (item.startsWith(COVER_SELECTION_URL_PREFIX) || item.startsWith(COVER_SELECTION_UPLOAD_PREFIX))
      ) {
        uniqueSelections.add(item);
      }
    });

    return Array.from(uniqueSelections);
  } catch {
    return [];
  }
}

export function getFileSignature(file: FileLike): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export function createUrlCoverSelection(url: string) {
  return `${COVER_SELECTION_URL_PREFIX}${url}`;
}

export function createUploadCoverSelection(file: FileLike) {
  return `${COVER_SELECTION_UPLOAD_PREFIX}${getFileSignature(file)}`;
}

export function sortImagesWithCoverSelection(params: {
  existingImages: string[];
  manualImages: string[];
  uploadedImages: string[];
  uploadFiles: File[];
  coverSelection: string | null | undefined;
  imageOrderSelections?: string[];
}) {
  const { existingImages, manualImages, uploadedImages, uploadFiles, coverSelection, imageOrderSelections = [] } = params;
  const images = normalizeImageUrls([...existingImages, ...manualImages, ...uploadedImages]);

  const imageUrlsBySelection = new Map<string, string>();
  existingImages.forEach((imageUrl) => {
    const normalizedUrl = normalizeImageUrl(imageUrl);
    if (normalizedUrl) {
      imageUrlsBySelection.set(createUrlCoverSelection(normalizedUrl), normalizedUrl);
    }
  });
  manualImages.forEach((imageUrl) => {
    const normalizedUrl = normalizeImageUrl(imageUrl);
    if (normalizedUrl) {
      imageUrlsBySelection.set(createUrlCoverSelection(normalizedUrl), normalizedUrl);
    }
  });
  uploadFiles.forEach((file, index) => {
    const uploadedImage = normalizeImageUrl(uploadedImages[index] ?? null);
    if (uploadedImage) {
      imageUrlsBySelection.set(createUploadCoverSelection(file), uploadedImage);
    }
  });

  const orderedImages: string[] = [];
  const usedImages = new Set<string>();

  imageOrderSelections.forEach((selection) => {
    const imageUrl = imageUrlsBySelection.get(selection);
    if (imageUrl && !usedImages.has(imageUrl)) {
      orderedImages.push(imageUrl);
      usedImages.add(imageUrl);
    }
  });

  images.forEach((imageUrl) => {
    if (!usedImages.has(imageUrl)) {
      orderedImages.push(imageUrl);
      usedImages.add(imageUrl);
    }
  });

  if (!coverSelection) {
    return orderedImages;
  }

  let coverImageUrl: string | null = null;

  if (coverSelection.startsWith(COVER_SELECTION_URL_PREFIX)) {
    coverImageUrl = normalizeImageUrl(coverSelection.slice(COVER_SELECTION_URL_PREFIX.length));
  } else if (coverSelection.startsWith(COVER_SELECTION_UPLOAD_PREFIX)) {
    const signature = coverSelection.slice(COVER_SELECTION_UPLOAD_PREFIX.length);
    const uploadIndex = uploadFiles.findIndex((file) => getFileSignature(file) === signature);
    coverImageUrl = uploadIndex >= 0 ? uploadedImages[uploadIndex] ?? null : null;
  }

  if (!coverImageUrl) {
    return orderedImages;
  }

  const coverIndex = orderedImages.indexOf(coverImageUrl);
  if (coverIndex <= 0) {
    return orderedImages;
  }

  return [orderedImages[coverIndex], ...orderedImages.filter((_, index) => index !== coverIndex)];
}

export function getAnnuncioImages(annuncio: AnnuncioWithImages): string[] {
  const galleryImages = Array.isArray(annuncio.immagini_urls) ? annuncio.immagini_urls : [];
  return normalizeImageUrls([...galleryImages, annuncio.immagine_url]);
}
