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
  products: Array<Product>;

  constructor(private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.storeService.getProducts()
      .subscribe(result => this.products = result);
  }

  openProductDetail(id: number) {
    this.router.navigate(['products', id], { relativeTo: this.route });
  }
}
