import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const document = await db.document.findUnique({
      where: {
        id: params.documentId,
      },
    });

    if (!document) {
      return new NextResponse("Document not found", { status: 404 });
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("[DOCUMENT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const { userId } = auth();
    const { content } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const document = await db.document.update({
      where: {
        id: params.documentId,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("[DOCUMENT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
