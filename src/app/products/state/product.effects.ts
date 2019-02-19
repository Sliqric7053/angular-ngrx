import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ProductService } from '../product.service';

import * as productActions from '../state/product.actions';
import { Product } from '../product';

import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) =>
      this.productService.getProducts().pipe(
        map((products: Product[]) => new productActions.LoadSuccess(products)),
        catchError(e => of(new productActions.LoadFail(e)))
      )
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Update),
    map((action: productActions.Update) => action.payload),
    mergeMap((product: Product) => {
      return this.productService.updateProduct(product).pipe(
        map(updatedProduct => new productActions.UpdateSuccess(updatedProduct)),
        catchError(e => of(new productActions.UpdateFail(e)))
      );
    })
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Create),
    map((action: productActions.Create) => action.payload),
    mergeMap((product: Product) => {
      return this.productService.createProduct(product).pipe(
        map(createdProduct => new productActions.CreateSuccess(createdProduct)),
        catchError(e => of(new productActions.CreateFail(e)))
      );
    })
  );
}
