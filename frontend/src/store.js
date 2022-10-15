import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;


// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import counterReducer from "./components/sessions/counterSlice";



// import sessionReducer from "./components/sessions/sessionSlice";
//
// export const store = configureStore({
//     reducer: {
//         counter: counterReducer,
//         session: sessionReducer,
//     },
// });
//
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
//     >;