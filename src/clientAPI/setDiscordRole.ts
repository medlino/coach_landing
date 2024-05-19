export async function setDiscordRole() {
  try {
    const response = await fetch('/api/setDiscordRole', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Something is not ok!', JSON.stringify(response));
    }
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
  }
}
