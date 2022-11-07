// import {
//   ADD_TO_CART,
//   INCREASE_PRODUCT,
//   REMOVE_PRODUCT_TO_CART,
//   DECREASE_PRODUCT,
// } from "../action/actiontype";

// const initState = [];

// const CartReducer = (state = initState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const exist = state.find((product) => product.id === action.payload.id);

//       if (exist) {
//         const cart = state.map((item) =>
//           item.id === action.payload.id
//             ? {
//                 ...item,
//                 quantity: item.quantity + action.payload.quantity,
//               }
//             : item
//         );

//         return cart;
//       }

//       return [...state, action.payload];

//     case REMOVE_PRODUCT_TO_CART:
//       const cart = state.filter((product) => product.id !== action.payload);
//       return cart;

//     case INCREASE_PRODUCT:
//       const existIncrease = state.find(
//         (product) => product.id === action.payload
//       );

//       if (existIncrease) {
//         const product = state.map((item) =>
//           item.id === action.payload
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return product;
//       }
//       return state;

//     case DECREASE_PRODUCT:
//       const existDecrease = state.find(
//         (product) => product.id === action.payload
//       );

//       if (existDecrease) {
//         const product = state.map((item) =>
//           item.id === action.payload
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         );
//         return product;
//       }
//       return state;

//     default:
//       return state;
//   }
// };
// export default CartReducer;
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const exist = state.find((product) => product.id === action.payload.id);

      if (exist) {
        const cart = state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item
        );

        return cart;
      }

      return [...state, action.payload];
    },

    removeProductToCart: (state, action) => {
      const cart = state.filter((product) => product.id !== action.payload);
      return cart;
    },

    increaseProductToCart: (state, action) => {
      const existIncrease = state.find(
        (product) => product.id === action.payload
      );

      if (existIncrease) {
        const product = state.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return product;
      }
      return state;
    },

    decreaseProductToCart: (state, action) => {
      const existDecrease = state.find(
        (product) => product.id === action.payload
      );

      if (existDecrease) {
        const product = state.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return product;
      }
      return state;
    },
  },
});
