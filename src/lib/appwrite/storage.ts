"use client";

import { storage } from "@/lib/appwrite/client";
import { getCertificatesBucketId, getPostersBucketId } from "@/lib/appwrite/constants";

export function getPosterPreviewUrl(fileId: string, width = 800) {
  const bucketId = getPostersBucketId();
  return storage.getFilePreview(bucketId, fileId, width, 0, undefined, 80);
}

export function getPosterViewUrl(fileId: string) {
  const bucketId = getPostersBucketId();
  return storage.getFileView(bucketId, fileId);
}

export function getCertificateDownloadUrl(fileId: string) {
  const bucketId = getCertificatesBucketId();
  return storage.getFileDownload(bucketId, fileId);
}
