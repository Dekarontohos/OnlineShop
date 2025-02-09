import { getProducts } from "../api";

export const fetchProducts = async (sessions, page, limit) => {
	const products = await getProducts(page, limit);

	return { error: null, response: products };
};
