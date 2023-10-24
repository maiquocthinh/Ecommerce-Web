
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import modalReducer from '../Components/commonListing/ModalMenu/modalSlice';
import pathSlice from "./Slices/common/pathSlice";
import  * as SlicesApi from './Slices/product/index';
import * as userSlice from "./Slices/user"
import * as commonSlice from "./Slices/common"
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    path:pathSlice,
    allproduct:SlicesApi.ProductsSlice.default,
    saleProduct:SlicesApi.SaleProductSlice.default,
    posterSale:SlicesApi.PosterSaleSlice.default,
    laptopProduct:SlicesApi.LaptopProductsSlice.default,
    tabletProduct:SlicesApi.TabletProductsSlice.default,
    devices:SlicesApi.DevicesSlice.default,
    product:SlicesApi.ProductByIdSlice.default,
    auth:userSlice.auth.default,
    pageLevelLoading:commonSlice.pageLevelLoading.default,
    componentLeveLoading:commonSlice.componentLeveLoadingSlice.default
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
