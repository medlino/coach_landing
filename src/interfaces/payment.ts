import { MProduct } from './produtc';
import { MRole } from './role';

export enum PaymentStatus {
  ROLE_ADD_PENDING = 'role_add_pending',
  ACTIVE = 'active',
  CANCELED = 'canceled',
}

export interface MPayment {
  email: string;
  amount: number;
  date: Date;
  type: 'subscription' | 'payment';
  token: string;
  checkoutId: string;
  payment_intent: string | null;
  subscription: string | null;
  products: MProduct[];
  status: string;
  roles: MRole[];
  userId?: string;
}
