import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) { 
    this.dtOptions = {
      autoWidth: true,
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.subscription = this.productService.getAll().subscribe(res => {
      this.filteredProducts = this.products = res;
      //this.dtTrigger.next(this.filteredProducts);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query 
                    ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) 
                    : this.products;
  }
}
