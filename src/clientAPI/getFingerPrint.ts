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
    });

    const result = await fpPromise.get();
    return result.visitorId;
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
  }
}
