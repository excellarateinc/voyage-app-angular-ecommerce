import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'app/core/store/product.model';
import { StoreService } from 'app/core/store/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product = new Product();

  constructor(private route: ActivatedRoute,
    private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getProduct(this.route.snapshot.params['id']).subscribe(result => {
      this.product = result;
    })

    this.route.params
    .subscribe(
      (params: Params) => {
        this.storeService.getProduct(params['id']).subscribe(result => {
          this.product = result;
        })
      }
    )
  }

}
