import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'No request body' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    let text = '';
    
    try {
      // Process PDF files
      if (file.type === 'application/pdf') {
        const pdfData = await pdfParse(Buffer.from(bytes));
        text = pdfData.text;
      }
      // Process Word documents
      else if (
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const result = await mammoth.extractRawText({ buffer: Buffer.from(bytes) });
        text = result.value;
      } else {
        return NextResponse.json(
          { error: `Unsupported file type: ${file.type}` },
          { status: 400 }
        );
      }
    } catch (processError) {
      console.error('Error processing file:', processError);
      return NextResponse.json(
        { error: 'Failed to process file content' },
        { status: 500 }
      );
    }

    if (!text) {
      return NextResponse.json(
        { error: 'No text content extracted from file' },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
} 