export async function isDiscordMember() {
  try {
    const response = await fetch('/api/isDiscordMember', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
    }

    const isMember = await response.json();
    return isMember;
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
  }
}
