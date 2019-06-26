import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/core/store/store.service';
import { Product } from 'app/core/store/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: Array<Product>;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.getProductListing().subscribe( result => {
      this.products = result;
    })
  }

}
