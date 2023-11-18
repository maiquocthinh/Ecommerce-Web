import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
};

const adminRole = createSlice({
    name: "adminRole",
    initialState,
    reducers: {
        setRoleAdmin: (state, action) => {
            console.log("setRoleAdmin", action.payload);
            state.data = action.payload;
        },
    },
});

export const { setRoleAdmin } = adminRole.actions;
export default adminRole.reducer;
