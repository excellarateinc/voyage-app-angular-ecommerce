export class CartProduct {

  public cartProductId: number;
  public productId: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  public price: number;
  public size: string;
  public quantity: number;

  constructor(
    cartProductId: number,
    productId: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    size: string,
    quantity: number) {
    this.cartProductId = cartProductId;
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.size = size;
    this.quantity = quantity;
  }
}
