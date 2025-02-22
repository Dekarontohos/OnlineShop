import { getProduct } from "../api";

export const fetchProduct = async (productId) => {
	const product = await getProduct(productId);

	return { error: null, response: product };
};
