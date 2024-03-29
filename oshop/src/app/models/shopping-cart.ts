import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string] : ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({...item, key: productId }));
        }
    }

    // get productIds() {
    //     return Object.keys(this.items);
    // }

    get totalPrice() {
        let sum = 0;
        for(let item of this.items) {
            sum += item.totalPrice;
        }

        return sum;
    }

    get totalItemsCount(): number {
        let count = 0;
        for(let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

}