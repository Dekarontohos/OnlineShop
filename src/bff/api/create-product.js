export const createProduct = (productData) =>
	fetch("http://localhost:3005/products", {
		method: "POST",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify(productData),
	}).then((createdProduct) => createdProduct.json());
