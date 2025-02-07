import {
  NewClient,
  Client,
  ClientData,
  Country,
  NewInvoice,
  ExchangeRateResponse,
} from '../interfaces/accounting';

const getAccountingEnvs = () => {
  const {
    ACCOUNTING_EMAIL,
    ACCOUNTING_API_KEY,
    ACCOUNTING_COMPANY_ID,
    ACCOUNTING_URL,
    ACCOUNTING_EXCHANGE_API_ID,
  } = process.env;

  if (
    !ACCOUNTING_EMAIL ||
    !ACCOUNTING_API_KEY ||
    !ACCOUNTING_COMPANY_ID ||
    !ACCOUNTING_URL ||
    !ACCOUNTING_EXCHANGE_API_ID
  ) {
    throw new Error('Missing accounting environment variables');
  }

  return {
    ACCOUNTING_EMAIL,
    ACCOUNTING_API_KEY,
    ACCOUNTING_COMPANY_ID,
    ACCOUNTING_URL,
    ACCOUNTING_EXCHANGE_API_ID,
  };
};

const getAuthHeaders = () => {
  const { ACCOUNTING_EMAIL, ACCOUNTING_API_KEY, ACCOUNTING_COMPANY_ID } =
    getAccountingEnvs();

  return `SFAPI email=${encodeURIComponent(
    ACCOUNTING_EMAIL
  )}&apikey=${ACCOUNTING_API_KEY}&company_id=${ACCOUNTING_COMPANY_ID}`;
};

export async function getCountries(): Promise<Country[]> {
  const { ACCOUNTING_URL } = getAccountingEnvs();

  try {
    const response = await fetch(
      `${ACCOUNTING_URL}/countries/index/view_full:1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeaders(),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data at getCountries:', error);
    throw error;
  }
}

export async function getClientList(filter?: string): Promise<ClientData[]> {
  const { ACCOUNTING_URL } = getAccountingEnvs();

  try {
    const baseUrl = `${ACCOUNTING_URL}/clients/index.json`;
    const url = filter
      ? `${baseUrl}/search:${Buffer.from(filter, 'utf-8').toString('base64')}`
      : baseUrl;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data at getClientList:', error);
    throw error;
  }
}

export async function createClient(newClient: NewClient): Promise<Client> {
  const { ACCOUNTING_URL } = getAccountingEnvs();

  try {
    const response = await fetch(`${ACCOUNTING_URL}/clients/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeaders(),
      },
      body: JSON.stringify({
        Client: newClient,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const {
      data: { Client },
    } = await response.json();
    return Client;
  } catch (error) {
    console.error('Error at creating a new Client:', error);
    throw error;
  }
}

export async function createInvoice(invoice: NewInvoice): Promise<any> {
  const { ACCOUNTING_URL } = getAccountingEnvs();

  try {
    const response = await fetch(`${ACCOUNTING_URL}/invoices/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeaders(),
      },
      body: JSON.stringify(invoice),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error at creating a new Invoice:', error);
    throw error;
  }
}

// TODO: separate envs...
export async function fetchExchnageRate(
  from: string,
  to: string,
  value: number
): Promise<any> {
  const { ACCOUNTING_EXCHANGE_API_ID } = getAccountingEnvs();

  try {
    const response = await fetch(
      `https://api.fxratesapi.com/latest?base=${from}&currencies=${to}&resolution=1m&amount=1&places=6&format=json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCOUNTING_EXCHANGE_API_ID}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ExchangeRateResponse = await response.json();
    return (value / data.rates.HUF).toFixed(2);
  } catch (error) {
    console.error('Error at creating a new Invoice:', error);
    throw error;
  }
}
