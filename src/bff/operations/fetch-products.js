import { getProducts } from "../api";

export const fetchProducts = async (sessions, page, limit) => {
	const { products, links } = await getProducts(page, limit);

	return { error: null, response: { products, links } };
};
