export async function getDiscordRoles() {
  try {
    const response = await fetch('/api/getDiscordRoles', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Something is not ok!', JSON.stringify(response));
    }

    const roles = await response.json();
    return roles;
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
  }
}
