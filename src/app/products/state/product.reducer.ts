import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.actions';


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
