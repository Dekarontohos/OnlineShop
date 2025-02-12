import { Content, H2 } from "../../components";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { ProductTableRow, TableRow, EditingBlock } from "./components";
import { useServerRequest } from "../../hooks";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectEditingProduct } from "../../Redux/selectors";
import { setEditingProduct } from "../../actions";
import { Pagination } from "../products-list/components";
import { PAGINATIONS_LIMIT } from "../../constants";
import { getLastPageFromLinks } from "../../actions/utils/get-last-page-from-links";

const ProductsManagmentContainer = forwardRef(({ className }, ref) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
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
			requestServer("fetchProducts", page, PAGINATIONS_LIMIT),
			requestServer("fetchCategories"),
		]).then(([productsResponse, categoriesResponse]) => {
			if (productsResponse.error || categoriesResponse.error) {
				setErrorMessage(
					productsResponse.error || categoriesResponse.error,
				);
				return;
			}
			productsResponse.response.products.sort((a, b) => {
				return a.id - b.id;
			});
			setProducts(productsResponse.response.products);
			setCategories(categoriesResponse.response);
			setLastPage(getLastPageFromLinks(productsResponse.response.links));
		});
	}, [requestServer, page]);

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
						page={page}
						setLastPage={setLastPage}
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
						{products.length ? (
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
											products={products}
											setProducts={setProducts}
											setProductState={setProductState}
											clearEditingProduct={
												clearEditingProduct
											}
											page={page}
											setPage={setPage}
											setLastPage={setLastPage}
										></ProductTableRow>
									),
								)}
							</div>
						) : (
							<div className="no-products-found">
								Продукты не найдены
							</div>
						)}
						{lastPage > 1 &&
							(products.length >= PAGINATIONS_LIMIT ||
								products.length > 0) && (
								<Pagination
									className="pagination"
									page={page}
									setPage={setPage}
									lastPage={lastPage}
								></Pagination>
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
		height: 73vh;
		max-width: 1020px;
	}

	& .pagination {
		margin: 10px 10px 10px 0;
	}

	& .no-products-found {
		text-align: center;
		font-size: 24px;
		margin-top: 20px;
	}
`;
