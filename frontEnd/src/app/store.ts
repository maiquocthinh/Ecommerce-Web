import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import modalReducer from '../Components/components/ModalMenu/modalSlice';
import pathSlice from "./pathSlice";
import ProductsSlice from "./Slices/ProductsSlice"
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    path:pathSlice,
    allproduct:ProductsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
