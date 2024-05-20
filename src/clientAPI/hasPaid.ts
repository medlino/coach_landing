export async function hasPaid() {
  try {
    const response = await fetch('/api/hasPaid', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Something is not ok!', JSON.stringify(response));
    }

    const paid = await response.json();
    return paid;
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
  }
}
