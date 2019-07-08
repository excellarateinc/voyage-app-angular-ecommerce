import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';
import { StoreService } from './store.service';

@Injectable()
export class StoreResolverService implements Resolve<Product | string> {

  constructor(private storeService: StoreService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product | any> {
    return this.storeService.getProduct(route.params.id)
    .pipe(
      catchError((error: any) => of(error))
    );
  }
}
