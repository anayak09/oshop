import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  aflOrders: AngularFireList<any>;

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) { }


  getOrder() {
    return this.db.list('/orders').valueChanges();
  }
  
  async storeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrderByUser(userId: string) {
    this.aflOrders = this.db.list('/orders', order => order.orderByChild('userId'));
    return this.aflOrders
    .snapshotChanges()
    .pipe(map(changes => changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }
}
