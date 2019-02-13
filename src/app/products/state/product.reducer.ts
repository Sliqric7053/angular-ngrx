export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      console.log('TCL: reducer -> action.payload', action.payload);
      console.log('TCL: reducer -> state', state);
      return {
        ...state,
        showProductCode: action.payload,
      };

    default:
      return state;
  }
}
