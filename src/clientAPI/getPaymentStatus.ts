export async function getPaymentStatus() {
  try {
    const response = await fetch('/api/getPaymentStatus', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Something is not ok!', JSON.stringify(response));
    }

    const payment = await response.json();
    return payment;
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
  }
}
