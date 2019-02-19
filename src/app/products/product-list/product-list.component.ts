import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode$: Observable<boolean>;

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product | null>;
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProduct.AppState>) {}

  ngOnInit(): void {
    this.selectedProduct$ = this.store.pipe(
      select(fromProduct.getCurrentProduct)
    );

    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
  }

  ngOnDestroy(): void {}

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
