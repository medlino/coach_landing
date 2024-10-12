import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

export async function getFingerPrint() {
  try {
    const key = process.env.NEXT_PUBLIC_FINGERPRINTJS;

    if (!key) {
      throw new Error('Invalid request!');
    }

    const fpPromise = await FingerprintJS.load({
      apiKey: key,
      region: 'eu',
      endpoint: 'https://metrics.elmeereje.hu',
      scriptUrlPattern: `https://metrics.elmeereje.hu/web/v3/${key}/loader_v3.11.2.js`,
    });

    const result = await fpPromise.get();
    return result.visitorId;
  } catch (error) {
    console.error('Something went wrong!', error);
  }
}
