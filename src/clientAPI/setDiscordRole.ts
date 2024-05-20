export async function setDiscordRole(checkoutId: string) {
  try {
    const response = await fetch('/api/setDiscordRole', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ checkoutId }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
    }
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
    throw new Error('Something went wrong!');
  }
}
