export const MAX_ANNUNCIO_IMAGES = 12;

export type AnnuncioWithImages = {
  immagine_url?: string | null;
  immagini_urls?: string[] | null;
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

export function getAnnuncioImages(annuncio: AnnuncioWithImages): string[] {
  const galleryImages = Array.isArray(annuncio.immagini_urls) ? annuncio.immagini_urls : [];
  return normalizeImageUrls([...galleryImages, annuncio.immagine_url]);
}
