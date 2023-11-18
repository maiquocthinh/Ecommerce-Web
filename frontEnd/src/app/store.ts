import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import modalReducer from "./Slices/common/modalSlice";
import pathSlice from "./Slices/common/pathSlice";
import * as SlicesApi from "./Slices/product";
import * as userSlice from "./Slices/user";
import * as commonSlice from "./Slices/common";
import * as cartSlice from "./Slices/cart";
import * as addresSlice from "./Slices/address";
import * as OrderSlice from "./Slices/order";
import * as checkoutSlice from "./Slices/checkout";
import * as catalogsSlice from "./Slices/catalogs";
import * as reviewsSlice from "./Slices/review";
import * as adminEmployeesSlice from "./Slices/admin";
import * as adminProductSlice from "./Slices/admin/AdminProduct";
export const store = configureStore({
    reducer: {
        modal: modalReducer,
        path: pathSlice,
        allproduct: SlicesApi.ProductsSlice.default,
        mobileProduct: SlicesApi.MobileProductSlice.default,
        laptopProduct: SlicesApi.LabtopProductsSlice.default,
        productDetail: SlicesApi.ProductByIdSlice.default,
        searchProductData: SlicesApi.searchProductSlice.default,
        auth: userSlice.auth.default,
        pageLevelLoading: commonSlice.pageLevelLoading.default,
        componentLoading: commonSlice.componentLevelLoading.default,
        addToCart: cartSlice.AddTocartSlice.default,
        allCart: cartSlice.GetAllCartSlice.default,
        profile: userSlice.profile.default,
        showAdminSlide: commonSlice.showAdminSlide.default,
        showCart: commonSlice.showCartSlice.default,
        deleteCart: cartSlice.deleteCartSlice.default,
        allAddresses: addresSlice.getAllAddresses.default,
        updateAddressData: addresSlice.updateAddressSlice.default,
        updateDefaultAddress: addresSlice.updateDefaultAddressSlice.default,
        deleteAddressData: addresSlice.deleteAddressSlice.default,
        addToAddressData: addresSlice.addToAddressSlice.default,
        allOrder: OrderSlice.getAllOrderSlice.default,
        cancelOrder: OrderSlice.cancelOrderSlice.default,
        checkoutWithCartData: checkoutSlice.checkoutWithCartSlice.default,
        checkoutWithAuthenticationData:
            checkoutSlice.checkoutWithAuthenticationSlice.default,
        branchData: catalogsSlice.getAllBrandsSlice.default,
        categoriesData: catalogsSlice.getAllCategoriesSlice.default,
        needsData: catalogsSlice.getAllNeedsSlice.default,
        registerData: userSlice.registerSlice.default,
        resetPassword: userSlice.resetPasswordSlice.default,
        createReview: reviewsSlice.createReviewSlice.default,
        allReview: reviewsSlice.getAllReviewSlice.default,
        //admin
        authAmin: adminEmployeesSlice.AdminLoginSlice.default,
        adminRole: commonSlice.adminRole.default,
        //admin product
        adminAllProduct: adminProductSlice.AdminGetAllProduct.default,
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
