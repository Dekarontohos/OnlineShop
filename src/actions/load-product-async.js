import { setProductData } from "./set-product-data";

export const loadProductAsync = (requestServer, productId) => (dispatch) => {
	requestServer("fetchProduct", productId).then((productData) => {
		dispatch(setProductData(productData.response));
	});
};
