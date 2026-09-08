import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, fileUrl } = body;

    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.userId }
    });

    if (!providerProfile) return NextResponse.json({ error: "Provider profile not found" }, { status: 404 });

    const cert = await prisma.certification.create({
      data: {
        providerProfileId: providerProfile.id,
        name,
        fileUrl,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, certification: cert });
  } catch (error) {
    console.error("Add certification error:", error);
    return NextResponse.json({ error: "Failed to add certification" }, { status: 500 });
  }
}