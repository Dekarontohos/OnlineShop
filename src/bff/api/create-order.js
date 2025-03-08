export const createOrder = async (data) => {
	const createdOrderResponse = await fetch("http://localhost:3005/orders", {
		method: "POST",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify(data.orderData),
	});

	if (!createdOrderResponse.ok) {
		throw new Error("Ошибка при создании заказа.");
	}

	const createdOrder = await createdOrderResponse.json();

	const orderItemsPromises = data.orderItemsData.map((item) => {
		return fetch("http://localhost:3005/orders_items", {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				...item,
				order_id: createdOrder.id,
			}),
		});
	});

	const createdOrderItemsResponses = await Promise.all(orderItemsPromises);

	const createdOrderItems = await Promise.all(
		createdOrderItemsResponses.map((response) => {
			if (!response.ok) {
				throw new Error("Ошибка при создании элемента заказа");
			}
			return response.json();
		}),
	);

	return { createdOrder, createdOrderItems };
};
