import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import cart from "./cartSlice";

const store = configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;