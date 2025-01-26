import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
	appReducer,
	productReducer,
	productsReducer,
	userReducer,
	productOnEditionReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	product: productReducer,
	products: productsReducer,
	productOnEdition: productOnEditionReducer,
});

const composeEnhancers =
	window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
