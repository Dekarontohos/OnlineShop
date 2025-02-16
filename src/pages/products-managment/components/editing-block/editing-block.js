import styled from "styled-components";
import { Button, H2, Input, Label, Select } from "../../../../components";
import { useDispatch } from "react-redux";
import { forwardRef, useEffect, useMemo } from "react";
import { setEditingProduct } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";
import { useLocation } from "react-router-dom";
import { PAGINATIONS_LIMIT } from "../../../../constants";
import { getLastPageFromLinks } from "../../../../utils/get-last-page-from-links";

const EditingBlockContainer = forwardRef(
	(
		{
			className,
			categories,
			setProducts,
			product,
			productState,
			setProductState,
			clearEditingProduct,
			page,
			setLastPage,
		},
		ref,
	) => {
		const dispatch = useDispatch();
		const requestServer = useServerRequest();
		const location = useLocation();

		const shouldUpdateProductState = useMemo(() => {
			return (
				product.id &&
				product.id !== productState.id &&
				(product.name !== productState.name ||
					product.category !== productState.category ||
					product.price !== productState.price ||
					product.count !== productState.count ||
					product.image_url !== productState.image_url)
			);
		}, [product, productState]);

		useEffect(() => {
			if (shouldUpdateProductState) {
				setProductState(product);
			}
		}, [shouldUpdateProductState, product, setProductState]);

		useEffect(() => {
			if (product) {
				dispatch(setEditingProduct(product));
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [dispatch]);

		useEffect(() => {
			clearEditingProduct();
		}, [location.pathname, clearEditingProduct]);

		const handleChange = (event) => {
			const { name, value } = event.target;
			switch (name) {
				case "name":
					setProductState({ ...productState, name: value });
					break;
				case "category":
					setProductState({
						...productState,
						category: value,
					});
					break;
				case "price":
					setProductState({ ...productState, price: Number(value) });
					break;
				case "count":
					setProductState({ ...productState, count: Number(value) });
					break;
				case "image_url":
					setProductState({ ...productState, image_url: value });
					break;
				default:
					break;
			}
		};

		const createProduct = () => {
			if (!productState.name || !productState.image_url) {
				alert("Необходимо заполнить данные.");
				return;
			} else if (productState.price === 0) {
				alert("Цена не может быть нулевой.");
				return;
			} else if (productState.category === "") {
				alert("Необходимо указать категорию.");
				return;
			}
			requestServer("addProduct", productState).then((result) => {
				if (result.response === "success") {
					alert("Продукт добавлен.");
				}
				requestServer("fetchProducts", page, PAGINATIONS_LIMIT).then(
					(result) => {
						setProducts(result.response.products);
						setLastPage(
							getLastPageFromLinks(result.response.links),
						);
					},
				);
			});
		};

		const updateProduct = () => {
			if (!productState.name || !productState.image_url) {
				alert("Необходимо заполнить данные.");
				return;
			} else if (productState.price === 0) {
				alert("Цена не может быть нулевой.");
				return;
			}
			requestServer("changeProduct", productState).then((result) => {
				requestServer("fetchProducts", page, PAGINATIONS_LIMIT).then(
					(result) => {
						setProducts(result.response.products);
						setLastPage(
							getLastPageFromLinks(result.response.links),
						);
					},
				);
			});
			clearEditingProduct();
		};

		return (
			<div className={className} ref={ref}>
				{
					<div className="products-editing-panel">
						{(product.id && (
							<H2 fontSize={"22px;"} margin={"20px 0;"}>
								<span>Редактирование</span>
								<span>продукта</span>
							</H2>
						)) || (
							<H2 fontSize={"22px;"} margin={"20px 0;"}>
								<span>Добавление</span>
								<span>товара</span>
							</H2>
						)}

						<div>
							<Label>Наименование:</Label>
							<Input
								type="text"
								name="name"
								value={productState.name}
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label>Категория:</Label>
							<Select
								name="category"
								value={productState.category}
								onChange={handleChange}
							>
								{" "}
								<option value="" disabled>
									Выберите категорию
								</option>
								{categories.map((category) => (
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</Select>
						</div>
						<div>
							<Label>Стоимость:</Label>
							<Input
								type="number"
								name="price"
								value={productState.price}
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label>Количество:</Label>
							<Input
								type="number"
								name="count"
								value={productState.count}
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label>Фотография (url):</Label>
							<Input
								type="text"
								name="image_url"
								value={productState.image_url}
								onChange={handleChange}
							/>
						</div>

						{(product.id && (
							<Button
								width={"200px;"}
								fontSize={"20px;"}
								height={"50px;"}
								margin={"20px 0;"}
								onClick={updateProduct}
							>
								<span>Сохранить</span> <br></br>
								<span>изменения</span>
							</Button>
						)) || (
							<Button
								width={"200px;"}
								fontSize={"20px;"}
								height={"50px;"}
								margin={"20px 0;"}
								onClick={createProduct}
							>
								<span>Добавить</span> <br></br>
								<span>товар</span>
							</Button>
						)}
					</div>
				}
			</div>
		);
	},
);

export const EditingBlock = styled(EditingBlockContainer)`
	border-radius: 5px;
	padding: 10px;
	border: 2px solid #000;
	margin: 0 10px 0 0;
	height: 600px;
	width: 350px;
	align-items: center;
	flex-direction: column;
	display: flex;
	text-align: center;
`;
