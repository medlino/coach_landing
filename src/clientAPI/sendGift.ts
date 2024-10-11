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
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
    }
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
    throw new Error('Something went wrong!');
  }
}
