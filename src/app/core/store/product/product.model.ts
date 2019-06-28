export class Product {
  productId: number;
  name: string;
  imagePath: string;
  price: number;
  description: string;
  sizes: Array<string>;

  constructor(productId: number, name: string, imagePath: string, price: number, description: string, sizes: Array<string>) {
    this.productId = productId;
    this.name = name;
    this.imagePath = imagePath;
    this.price = price;
    this.description = description;
    this.sizes = sizes;
  }
}
