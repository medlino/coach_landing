import { MPayment } from '@/interfaces/payment';

export async function getPayments(): Promise<MPayment[]> {
  try {
    const response = await fetch('/api/getPayments', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
    }

    const payments = await response.json();
    return payments as MPayment[];
  } catch (error) {
    console.error('Something went wrong!', JSON.stringify(error));
    return [];
  }
}
