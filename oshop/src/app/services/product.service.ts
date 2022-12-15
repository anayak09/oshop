import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: AngularFireList<any>;
  
  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    this.productList = this.db.list('/products');
    return this.productList.snapshotChanges()
                           .pipe(map(changes => 
                                      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                                    ));
  }

  get(productId: string) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: string, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return (this.db.list('/products')).remove(productId);
  }
}
