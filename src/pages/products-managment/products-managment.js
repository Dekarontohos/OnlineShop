import { Content, H2 } from "../../components";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { ProductTableRow, TableRow, EditingBlock } from "./components";
import { useServerRequest } from "../../hooks";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectEditingProduct } from "../../Redux/selectors";
import { setEditingProduct } from "../../actions";

const ProductsManagmentContainer = forwardRef(({ className }, ref) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [productState, setProductState] = useState({
		name: "",
		category: "",
		price: 0,
		count: 0,
		image_url: "",
	});

	const requestServer = useServerRequest();
	const dispatch = useDispatch();

	let productOnEditing = useSelector(selectEditingProduct);
	const memoizedProductOnEditing = useMemo(
		() => productOnEditing,
		[productOnEditing],
	);

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
			productsResponse.response.sort((a, b) => {
				return a.id - b.id;
			});
			setProducts(productsResponse.response);
			setCategories(categoriesResponse.response);
		});
	}, [requestServer]);

	const clearEditingProduct = useCallback(() => {
		dispatch(
			setEditingProduct({
				category: null,
				count: null,
				id: null,
				image_url: null,
				name: null,
				price: null,
			}),
		);
		setProductState({
			name: "",
			category: "",
			price: 0,
			count: 0,
			image_url: "",
		});
	}, [dispatch]);

	return (
		<div className={className} ref={ref}>
			<Content error={errorMessage}>
				<H2 className={"header"} margin={"40px 0"}>
					Управление продуктами
				</H2>
				<div className="product-managment-content">
					<EditingBlock
						className={"editing-block"}
						categories={categories}
						setProducts={setProducts}
						product={memoizedProductOnEditing}
						productState={productState}
						setProductState={setProductState}
						clearEditingProduct={clearEditingProduct}
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
						<div className="table-body">
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
										category={
											categories.filter(
												(locCategory) =>
													locCategory.id ===
													String(category),
											)[0]
										}
										price={price}
										count={count}
										image_url={image_url}
										categories={categories}
										product={memoizedProductOnEditing}
										setProducts={setProducts}
										setProductState={setProductState}
										clearEditingProduct={
											clearEditingProduct
										}
									></ProductTableRow>
								),
							)}
						</div>
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
	margin: 0 auto;
	font-size: 18px;

	& .product-managment-content {
		display: flex;
		margin-left: -350px;
	}

	& .table {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	& .table-body {
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 75vh;
		max-width: 1020px;
	}
`;
