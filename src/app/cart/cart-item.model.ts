export class CartItem {
	public name: string;
	public price: number;
	public imgPath: string;
	public quantity: number;

	constructor(name: string, price: number, imgPath: string, quantity: number) {
		this.name = name;
		this.price = price;
		this.imgPath = imgPath;
		this.quantity = quantity;
	}
}
