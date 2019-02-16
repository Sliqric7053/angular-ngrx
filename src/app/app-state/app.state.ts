 // move to productState as here it will break lazy-loading boundary
// import { ProductState } from '../products/state/product.reducer';
import { UserState } from '../user/state/user.reducer';

export interface AppState {
  //   products: ProductState; // MOVED TO PRODUCT STATE
  users: UserState;
}
