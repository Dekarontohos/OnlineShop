import { getProduct } from "../api";

export const fetchProduct = async (productId) => {
	let product;
	let error;
	try {
		product = await getProduct(productId);
	} catch (productError) {
		error = productError;
	}

	if (error) {
		return { error, response: null };
	}

	return { error: null, response: product };
};
