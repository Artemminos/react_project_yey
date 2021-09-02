import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const reducer = {
    user:null// todosSlice.reducer,

}
export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
        }).concat(sagaMiddleware).concat(logger),
})
sagaMiddleware.run(watcherSaga);
