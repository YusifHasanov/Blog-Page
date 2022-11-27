import {configureStore} from "@reduxjs/toolkit";

import {setupListeners} from "@reduxjs/toolkit/query";
import {extendedUserSlice} from "../features/redux/slices/UserSlice";
import {apiSlice} from "../api/ApiSlice";



const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: extendedUserSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});


setupListeners(store.dispatch);

export default store;