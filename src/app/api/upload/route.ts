import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read the file as an ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = "";

    // Process based on file type
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const parsed = await pdfParse(buffer);
      extractedText = parsed.text;
    } else if (
      file.type === "text/plain" ||
      file.type === "text/markdown" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md")
    ) {
      extractedText = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF, TXT, or MD file." },
        { status: 400 }
      );
    }

    // In the future:
    // 1. Chunk this extractedText.
    // 2. Send chunks to OpenAI Embeddings API.
    // 3. Store embeddings in Pinecone/Vector DB.

    return NextResponse.json({
      success: true,
      message: "File successfully processed.",
      fileName: file.name,
      fileSize: file.size,
      textPreview: extractedText.substring(0, 200) + "...", // Sending back a preview for now
      textLength: extractedText.length
    });

  } catch (error: any) {
    console.error("Error processing file upload:", error);
    return NextResponse.json({ error: "File upload failed", details: error.message }, { status: 500 });
  }
}
