import { PrivateContent, H2, Pagination, Loader } from "../../components";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { ProductTableRow, TableRow, EditingBlock } from "./components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectEditingProduct } from "../../Redux/selectors";
import { setEditingProduct } from "../../actions";
import { PAGINATIONS_LIMIT, ROLE } from "../../constants";
import { checkAccess } from "../../utils";
import { selectUserRole } from "../../Redux/selectors";
import { request } from "../../utils/request";

const ProductsManagmentContainer = forwardRef(({ className }, ref) => {
	const userRole = useSelector(selectUserRole);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [productState, setProductState] = useState({
		name: "",
		category: "",
		price: 0,
		count: 0,
		image_url: "",
	});

	const dispatch = useDispatch();

	let productOnEditing = useSelector(selectEditingProduct);
	const memoizedProductOnEditing = useMemo(
		() => productOnEditing,
		[productOnEditing],
	);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		setLoading(true);
		Promise.all([
			// request(
			// 	`/products?search=${searchPhrase}&limit=${PAGINATIONS_LIMIT}&page=${page}${filterCategory ? `&categoryId=${filterCategory?.id}` : ""}&sort=${sort}`,
			// ),
			request(`/products?&limit=${PAGINATIONS_LIMIT}&page=${page}`),
			request("/categories"),
		])
			.then(([productsResponse, categoriesResponse]) => {
				setLoading(false);
				if (productsResponse.error || categoriesResponse.error) {
					setErrorMessage(
						productsResponse.error || categoriesResponse.error,
					);
					return;
				}
				productsResponse.data.products.sort((a, b) => {
					return a.id - b.id;
				});
				setProducts(productsResponse.data.products);
				setCategories(categoriesResponse.data);
				setLastPage(productsResponse.data.lastPage);
			})
			.catch((error) => {
				setLoading(false);
				setErrorMessage("Ошибка при загрузке данных.");
			});
	}, [page, userRole]);

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
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<Loader isVisible={loading} />
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
						setLoading={setLoading}
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
														String(category.id),
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
											setLoading={setLoading}
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
			</PrivateContent>
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
		height: 72.4vh;
		max-width: 1240px;
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
