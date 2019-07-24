import { CartProduct } from './cart-product.model';

export class Cart {

  public cartId: number;
  public totalCost: number;
  public products: CartProduct[];

  constructor(
    cartId: number,
    totalCost: number,
    products: CartProduct[]) {
    this.cartId = cartId;
    this.totalCost = totalCost;
    this.products = products;
  }
}
