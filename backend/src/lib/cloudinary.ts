import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

export const isCloudinaryConfigured = Boolean(
  CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/** Upload a base64 / data URI image to Cloudinary. */
export async function uploadImage(dataUri: string, folder = "royal-beauty") {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured.");
  }
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string) {
  if (!isCloudinaryConfigured) return;
  await cloudinary.uploader.destroy(publicId);
}

export { cloudinary };
