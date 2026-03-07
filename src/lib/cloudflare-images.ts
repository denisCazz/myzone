import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function getCloudflareR2Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY?.trim();
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME?.trim();
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL?.trim();
  const pathPrefix = process.env.CLOUDFLARE_R2_PATH_PREFIX?.trim() || 'annunci';

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl,
    pathPrefix,
  };
}

export function getCloudflareR2ConfigStatus() {
  const { accountId, accessKeyId, secretAccessKey, bucketName, publicUrl } = getCloudflareR2Config();

  return {
    hasAccountId: Boolean(accountId),
    hasAccessKeyId: Boolean(accessKeyId),
    hasSecretAccessKey: Boolean(secretAccessKey),
    hasBucketName: Boolean(bucketName),
    hasPublicUrl: Boolean(publicUrl),
  };
}

function ensureValidImageFile(file: File) {
  if (!file || file.size === 0) {
    throw new Error('Seleziona almeno un file immagine valido.');
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`Il file ${file.name} supera il limite di 5MB.`);
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(`Il file ${file.name} non è in un formato supportato.`);
  }
}

function getFileExtension(file: File) {
  const fileNameExtension = file.name.split('.').pop()?.toLowerCase();
  if (fileNameExtension) return fileNameExtension;

  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
}

function createR2Client() {
  const { accountId, accessKeyId, secretAccessKey } = getCloudflareR2Config();

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Configurazione Cloudflare R2 mancante.');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

function resolveCloudflareR2Url(key: string) {
  const { publicUrl } = getCloudflareR2Config();

  if (!publicUrl) {
    throw new Error('Configurazione Cloudflare R2 incompleta: manca CLOUDFLARE_R2_PUBLIC_URL.');
  }

  return `${publicUrl.replace(/\/$/, '')}/${key}`;
}

async function uploadSingleImageToCloudflareR2(file: File): Promise<string> {
  ensureValidImageFile(file);

  const { bucketName, pathPrefix } = getCloudflareR2Config();
  if (!bucketName) {
    throw new Error('Configurazione Cloudflare R2 incompleta: manca CLOUDFLARE_R2_BUCKET_NAME.');
  }

  const client = createR2Client();
  const fileExtension = getFileExtension(file);
  const objectKey = `${pathPrefix.replace(/^\/+|\/+$/g, '')}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: fileBuffer,
      ContentType: file.type,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  return resolveCloudflareR2Url(objectKey);
}

export async function uploadImagesToCloudflareR2(files: File[]) {
  const validFiles = files.filter((file) => file.size > 0);

  if (validFiles.length === 0) {
    return [];
  }

  const uploadedUrls = await Promise.all(validFiles.map((file) => uploadSingleImageToCloudflareR2(file)));
  return uploadedUrls;
}
