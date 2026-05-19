import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { adminStorage } from "@/lib/appwrite/server";
import { getPostersBucketId } from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";

export async function POST(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);

    if (!["coordinator", "faculty", "hoi"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof (file as any)?.arrayBuffer !== "function") {
      return NextResponse.json({ error: "Missing or invalid file" }, { status: 400 });
    }

    const fileObj = file as File;
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(fileObj.type)) {
      return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
    }

    const MAX_BYTES = 5 * 1024 * 1024;
    if (fileObj.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const buffer = await fileObj.arrayBuffer();
    const blob = new File([buffer], fileObj.name, { type: fileObj.type });

    const upload = await adminStorage.createFile(getPostersBucketId(), ID.unique(), blob);

    return NextResponse.json({ fileId: upload.$id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
