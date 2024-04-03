import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Route segment config
export const runtime = 'edge';

export async function GET(_req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundImage: 'url(https://elmeereje.hu/og-bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      />
    )
  );
}
