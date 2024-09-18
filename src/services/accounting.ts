import puppeteer, { Page } from 'puppeteer';

const SITE_URL = 'https://www.turbofaktura.sk/';

function buildFilterUrl(
  baseUrl: string,
  companyName: string,
  streetName: string
) {
  const encodedCompanyName = encodeURIComponent(companyName);
  const encodedStreetName = encodeURIComponent(streetName);

  const filterUrl = `${baseUrl}?adresyGrid-polluted=1&adresyGrid-orderBy%5Bfirma%5D=0&adresyGrid-filters%5Bfirma%5D=${encodedCompanyName}&adresyGrid-filters%5Bulice%5D=${encodedStreetName}`;
  return filterUrl;
}

async function auth(page: Page) {
  const email = process.env.ACCOUNTING_EMAIL;
  const pw = process.env.ACCOUNTING_PW;

  if (!email || !pw) {
    throw new Error('Invalid request!');
  }

  await page.goto(`${SITE_URL}/prihlaseni/`);

  await page.type('input[name="email"]', email);
  await page.type('input[name="password"]', pw);

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation(),
  ]);
}

async function isAddressExist(
  page: Page,
  companyName: string,
  streetName: string
) {
  const baseUrl = `${SITE_URL}/adresy/`;
  const filterUrl = buildFilterUrl(baseUrl, companyName, streetName);

  await page.goto(filterUrl);

  const result = await page.evaluate(() => {
    const row = document.querySelector('.body-cell.body-cell-firma');
    if (row) {
      return row.textContent?.trim();
    }
    return null;
  });

  return !!result;
}

async function createAddress(
  page: Page,
  { name, street, city, zipCode, email }: any
) {
  await page.goto(`${SITE_URL}/adresy/pridat-adresu`);

  await page.select('select[name="typ"]', '1');
  await page.type('input[name="firma"]', name);
  await page.type('input[name="jmeno"]', name);
  await page.type('input[name="ulice"]', street);
  await page.type('input[name="psc"]', zipCode);
  await page.type('input[name="mesto"]', city);
  await page.select('select[name="staty_id"]', '234');
  await page.type('input[name="email"]', email);

  await Promise.all([
    page.click('input[type="submit"][name="save"]'),
    page.waitForNavigation(),
  ]);
}

export async function handleAccounting({ companyName, streetName }: any) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await auth(page);
  const isExists = await isAddressExist(page, companyName, streetName);

  if (isExists) {
  } else {
  }

  await browser.close();
}
