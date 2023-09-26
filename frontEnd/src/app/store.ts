import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import modalReducer from '../Components/ModalMenu/modalSlice';
import pathSlice from "./pathSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    path:pathSlice
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
