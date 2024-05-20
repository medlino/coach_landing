export async function cancelPayment(subscriptionId: string) {
  try {
    const response = await fetch('/api/cancelPayment', {
      method: 'DELETE',
      body: JSON.stringify({ subscriptionId }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
    }
  } catch (error: any) {
    console.error('Something went wrong!', JSON.stringify(error));
    throw new Error('Something went wrong!');
  }
}
