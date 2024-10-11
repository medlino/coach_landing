export async function getGift(qr_id: string) {
  try {
    const response = await fetch(`/api/getGift?id=${qr_id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
    }

    const exists = await response.json();
    return exists;
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
  }
}
