import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
    totalPrice: 0,
  },
  reducers: {
    buyProduct: (state, actions) => {
      const had = state.item.some((e) => e.id == actions.payload.id);
      if (!had) {
        return {
          ...state,
          item: [
            ...state.item,
            {
              ...actions.payload,
              quantity: 1,
            },
          ],
          totalPrice: state.totalPrice + actions.payload.price,
        };
      } else {
        let arr = state.item.filter((e) => e.id == actions.payload.id);
        arr[0] = {
          ...arr[0],
          quantity: arr[0].quantity + 1,
        };
        let index = state.item.findIndex((e) => e.id == actions.payload.id);
        let arrNew = [...state.item];
        arrNew.splice(index, 1, arr[0]);
        return {
          ...state,
          item: [...arrNew],
          totalPrice: state.totalPrice + actions.payload.price,
        };
      }
    },
    incre: (state, actions) => {
      let arr = state.item.filter((e) => e.id == actions.payload.id);
      arr[0] = {
        ...arr[0],
        quantity: arr[0].quantity + 1,
      };
      let index = state.item.findIndex((e) => e.id == actions.payload.id);
      let arrNew = [...state.item];
      arrNew.splice(index, 1, arr[0]);
      return {
        ...state,
        item: [...arrNew],
        totalPrice: state.totalPrice + actions.payload.price,
      };
    },
    decre: (state, actions) => {
      let arr = state.item.filter((e) => e.id == actions.payload.id);
      if (arr[0].quantity < 2) {
      } else {
        arr[0] = {
          ...arr[0],
          quantity: arr[0].quantity - 1,
        };
        let index = state.item.findIndex((e) => e.id == actions.payload.id);
        let arrNew = [...state.item];
        arrNew.splice(index, 1, arr[0]);
        return {
          ...state,
          item: [...arrNew],
          totalPrice: state.totalPrice - actions.payload.price,
        };
      }
    },

    deleteProduct: (state, actions) => {
      let index = state.item.findIndex((e) => e.id == actions.payload.id);
      let arrNew = [...state.item];
      arrNew.splice(index, 1);
      return {
        ...state,
        item: [...arrNew],
        totalPrice:
          state.totalPrice - actions.payload.price * actions.payload.quantity,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { buyProduct, deleteProduct, incre, decre } = cartSlice.actions;

export default cartSlice.reducer;
