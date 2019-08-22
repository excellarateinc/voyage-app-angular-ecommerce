import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'app/shared/models/product.model';
import { StoreService } from 'app/shared/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  productRows: Product[][] = [];
  products: Product[];

  constructor(private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.storeService.getProducts()
      .subscribe(result => {
        this.products = result;
        this.createProductRows();
      });
  }

  openProductDetail(id: number) {
    this.router.navigate(['products', id], { relativeTo: this.route });
  }

  private createProductRows(): void {
    const rowSize = 3;
    const numGroups = Math.ceil(this.products.length / rowSize);
    for (let i = 0; i < numGroups; i++) {
      const currentIndex = i * rowSize;
      const remainder = this.products.slice(currentIndex).length;
      const take = remainder > rowSize ? rowSize : remainder;
      const group = this.products.slice(currentIndex, currentIndex + take);
      this.productRows[i] = [...group];
    }
  }
}
