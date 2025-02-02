import { getProducts } from "../api";

export const fetchProducts = async () => {
	const products = await getProducts();

	return { error: null, response: products };
};
