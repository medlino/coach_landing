import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(_req: NextRequest) {
  const filePath = path.join(
    process.cwd(),
    'public',
    'docs',
    'ingyenes_tartalom.pdf'
  );

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ingyenes_tartalom.pdf"',
      },
    });
  } catch (error) {
    console.error('Failed to download PDF:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
