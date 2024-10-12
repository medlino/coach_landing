export async function sendGift(
  qr_id: string,
  email: string,
  visitorId: string
) {
  try {
    const response = await fetch('/api/sendGift', {
      method: 'POST',
      body: JSON.stringify({ email, visitorId, id: qr_id }),
    });

    const error = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    if (!response.ok) {
      throw new Error('Response is not ok');
    }
  } catch (error) {
    throw new Error(`Something went wrong! - ${error}`);
  }
}
