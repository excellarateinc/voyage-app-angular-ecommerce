import { OrderStatus } from './order-status.enum';

export class Order {
  orderId: number;
  orderNumber: string;
  orderStatusId: OrderStatus;
  name: string;
  email: string;
  company: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  createdUtc: Date;
  modifiedUtc: Date;
  total: number;
  cartProducts: any[];
}
