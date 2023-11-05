import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import modalReducer from "../Components/commonListing/ModalMenu/modalSlice";
import pathSlice from "./Slices/common/pathSlice";
import * as SlicesApi from "./Slices/product";
import * as userSlice from "./Slices/user";
import * as commonSlice from "./Slices/common";
import * as cartSlice from "./Slices/cart";
export const store = configureStore({
    reducer: {
        modal: modalReducer,
        path: pathSlice,
        allproduct: SlicesApi.ProductsSlice.default,
        productDetail: SlicesApi.ProductByIdSlice.default,
        auth: userSlice.auth.default,
        pageLevelLoading: commonSlice.pageLevelLoading.default,
        componentLoading: commonSlice.componentLevelLoading.default,
        addToCart: cartSlice.AddTocartSlice.default,
        allCart: cartSlice.GetAllCartSlice.default,
        profile: userSlice.profile.default,
        showAdminSlide: commonSlice.showAdminSlide.default,
        showCart: commonSlice.showCartSlice.default,
        deleteCart: cartSlice.deleteCartSlice.default,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
