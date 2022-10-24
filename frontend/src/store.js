import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;