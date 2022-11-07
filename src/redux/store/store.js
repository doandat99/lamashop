import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../reducer/cart";
import signupSlice from "../redux-thunk/usersSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartSlice.reducer,
  users: signupSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
