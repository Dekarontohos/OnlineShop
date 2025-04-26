import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
	appReducer,
	productReducer,
	userReducer,
	productOnEditionReducer,
	productsInBasketReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	product: productReducer,
	productOnEdition: productOnEditionReducer,
	productsInBasket: productsInBasketReducer,
});

const composeEnhancers =
	window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
