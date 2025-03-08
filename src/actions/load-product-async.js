import { setProductData } from "./set-product-data";

export const loadProductAsync = (requestServer, productId) => (dispatch) =>
	requestServer("fetchProduct", productId).then((productData) => {
		if (productData.response) {
			dispatch(setProductData(productData.response));
		}
		return productData;
	});
