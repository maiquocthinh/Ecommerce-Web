import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import modalReducer from '../Components/components/ModalMenu/modalSlice';
import pathSlice from "./pathSlice";
import  * as SlicesApi from './Slices/index';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    path:pathSlice,
    allproduct:SlicesApi.ProductsSlice.default,
    saleProduct:SlicesApi.SaleProductSlice.default,
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
