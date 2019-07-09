import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from './store/store.service';
import { Product } from './store/product.model';

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
    this.storeService.getProductListing().subscribe(result => {
      this.products = result;
    });
  }

  onSelect(id: number) {
    this.router.navigate(['products', id], {relativeTo: this.route});
  }

}
