import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Route segment config
export const runtime = 'edge';

export async function GET(_req: NextRequest) {
  return new ImageResponse(<img src="https://elmeereje.hu/og-bg.png" />, {
    width: 1024,
    height: 1024,
  });
}
