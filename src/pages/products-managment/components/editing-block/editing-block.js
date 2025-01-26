import styled from "styled-components";
import { Button, H2, Input, Label, Select } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import { selectEditingProduct } from "../../../../Redux/selectors";
import { setEditingProduct } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";

const EditingBlockContainer = forwardRef(
	({ className, categories, setProducts }, ref) => {
		const dispatch = useDispatch();
		const requestServer = useServerRequest();

		const [productName, setProductName] = useState("");
		const [productCategory, setProductCategory] = useState(0);
		const [productPrice, setProductPrice] = useState(0);
		const [productCount, setProductCount] = useState(0);
		const [productImage, setroductImage] = useState("");

		const product = useSelector(selectEditingProduct);
		console.log(product);
		let productState = product.id
			? product
			: {
					name: productName,
					category: productCategory,
					price: productPrice,
					count: productCount,
					image_url: productImage,
				};

		console.log(productState);

		useEffect(() => {
			if (product) {
				dispatch(setEditingProduct(product));
			}
		}, []);

		const handleChange = (event) => {
			const { name, value } = event.target;
			switch (name) {
				case "name":
					setProductName(value);
					break;
				case "category":
					setProductCategory(Number(value));
					break;
				case "price":
					setProductPrice(Number(value));
					break;
				case "count":
					setProductCount(Number(value));
					break;
				case "image_url":
					setroductImage(value);
					break;
				default:
					break;
			}
			productState = {
				name: productName,
				category: productCategory,
				price: productPrice,
				count: productCount,
				image_url: productImage,
			};
		};

		const CreateProduct = () => {
			if (!productName || !productImage) {
				alert("Необходимо заполнить данные.");
				return;
			} else if (productPrice === 0) {
				alert("Цена не может быть нулевой.");
				return;
			}
			requestServer("addProduct", productState).then((result) => {
				if (result.response === "success") {
					alert("Продукт добавлен.");
				}
				requestServer("fetchProducts").then((result) => {
					setProducts(result.response);
				});
			});
		};

		const UpdateProduct = () => {
			if (!productName || !productImage) {
				alert("Необходимо заполнить данные.");
				return;
			} else if (productPrice === 0) {
				alert("Цена не может быть нулевой.");
				return;
			}
			requestServer("changeProduct", productState).then((result) => {
				if (result.response === "success") {
					alert("Продукт обновлен.");
				}
				requestServer("fetchProducts").then((result) => {
					setProducts(result.response);
				});
			});
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
								onClick={UpdateProduct}
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
								onClick={CreateProduct}
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
