export interface Client {
  account: string | null;
  address: string;
  bank_account: string;
  bank_account_id: string;
  bank_account_prefix: string | null;
  bank_code: string;
  city: string;
  comment: string;
  country: string;
  country_id: string;
  created: string;
  currency: string | null;
  default_variable: string;
  delivery_address: string;
  delivery_city: string;
  delivery_country: string;
  delivery_country_id: string;
  delivery_name: string;
  delivery_phone: string;
  delivery_state: string;
  delivery_zip: string;
  dic: string;
  discount: number | null;
  distance: number | null;
  dont_travel: boolean | null;
  due_date: string | null;
  email: string;
  fax: string;
  iban: string;
  ic_dph: string;
  ico: string;
  id: string;
  modified: string;
  name: string;
  notices: boolean;
  phone: string;
  state: string;
  swift: string;
  tags: string[] | null;
  user_id: string;
  user_profile_id: string;
  uuid: string | null;
  zip: string;
}

export interface ClientStat {
  cancel_count: string | null;
  cancel_total: string | null;
  client_id: string | null;
  date_founded: string | null;
  delivery_count: string | null;
  delivery_total: string | null;
  estimate_count: string | null;
  estimate_total: string | null;
  expense_count: string | null;
  expense_total: string | null;
  expense_unpaid_count: string | null;
  expense_unpaid_total: string | null;
  id: string | null;
  order_count: string | null;
  order_total: string | null;
  pay_time: string | null;
  proforma_count: string | null;
  proforma_overdue_count: string | null;
  proforma_overdue_total: string | null;
  proforma_total: string | null;
  regular_count: string | null;
  regular_overdue_count: string | null;
  regular_overdue_total: string | null;
  regular_total: string | null;
  reverse_order_count: string | null;
  reverse_order_total: string | null;
  risk: string | null;
}

export interface ClientData {
  Client: Client;
  ClientStat: ClientStat;
}

export interface Country {
  Country: {
    eu: boolean;
    id: number;
    iso: string;
    name: string;
  };
}

export interface NewClient {
  address: string;
  city: string;
  country: string;
  country_id: number;
  currency: string;
  email: string;
  name: string;
  phone: string;
  zip: string;
}

export interface NewInvoice {
  Invoice: {
    invoice_currency: string;
    created: string;
    delivery: string;
    due: string;
    already_paid: number;
    comment: string;
  };
  InvoiceItem: {
    name: string;
    tax: number;
    unit_price: number;
  }[];
  Client: {
    name: string;
    ico: string;
    match_address: string;
    zip: string;
    email: string;
    country_id: string;
    city: string;
  };
}
