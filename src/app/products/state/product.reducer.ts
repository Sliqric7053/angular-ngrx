import { Product } from '../product';
import * as fromRoot from '../../app-state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: 0 || null,
  products: [],
  error: '',
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find(product => product.id === currentProductId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload,
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id,
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null,
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0,
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: '',
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    case ProductActionTypes.UpdateSuccess:
      const updatedProducts = state.products.map(product =>
        product.id === action.payload.id ? action.payload : product
      );
      return {
        ...state,
        currentProductId: action.payload.id,
        products: updatedProducts,
        error: '',
      };
    case ProductActionTypes.UpdateFail:
      return {
        ...state,
        error: action.payload,
      };
    case ProductActionTypes.CreateSuccess:
      const addedProduct = [...state.products, action.payload];
      return {
        ...state,
        currentProductId: action.payload.id,
        products: addedProduct,
        error: '',
      };
      case ProductActionTypes.CreateFail:
      return {
        ...state,
        error: action.payload,
      };
    case ProductActionTypes.DeleteSuccess:
      const deletedProduct = state.products.filter(
        product => product.id !== action.payload
      );
      return {
        ...state,
        currentProductId: action.payload,
        products: deletedProduct,
        error: '',
      };
      case ProductActionTypes.DeleteFail:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
