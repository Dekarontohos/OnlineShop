import { Content, H2 } from "../../components";
import { forwardRef, useEffect, useState } from "react";
import { ProductTableRow, TableRow, EditingBlock } from "./components";
import { useServerRequest } from "../../hooks";
import styled from "styled-components";

const ProductsManagmentContainer = forwardRef(({ className }, ref) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([
			requestServer("fetchProducts"),
			requestServer("fetchCategories"),
		]).then(([productsResponse, categoriesResponse]) => {
			if (productsResponse.error || categoriesResponse.error) {
				setErrorMessage(
					productsResponse.error || categoriesResponse.error,
				);
				return;
			}
			setProducts(productsResponse.response);
			setCategories(categoriesResponse.response);
		});
	}, [requestServer]);

	return (
		<div className={className} ref={ref}>
			<Content error={errorMessage}>
				<H2>Управление продуктами</H2>
				<div className="product-managment-content">
					<EditingBlock
						className={"editing-block"}
						categories={categories}
						setProducts={setProducts}
					></EditingBlock>
					<div className="table">
						<TableRow className="table-header">
							<div className="id-column">id</div>
							<div className="name-column">Наименование</div>
							<div className="category-column">Категория</div>
							<div className="price-column">Стоимость</div>
							<div className="count-column">Количество</div>
							<div className="image-column">Фото</div>
							<div className="actions-column">Действия</div>
						</TableRow>
						{products.map(
							({
								id,
								name,
								category,
								price,
								count,
								image_url,
							}) => (
								<ProductTableRow
									key={id}
									id={id}
									name={name}
									category={categories[category]}
									price={price}
									count={count}
									image_url={image_url}
									categories={categories}
								></ProductTableRow>
							),
						)}
					</div>
				</div>
			</Content>
		</div>
	);
});

export const ProductsManagment = styled(ProductsManagmentContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 980px
	margin: 0 auto;
	font-size:18px;

	& .product-managment-content {
		display:flex;
	}
`;
