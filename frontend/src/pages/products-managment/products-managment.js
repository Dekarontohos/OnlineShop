import {
	PrivateContent,
	H2,
	Pagination,
	Loader,
	SearchRow,
	Button,
	SortArrow,
	Select,
} from "../../components";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { ProductTableRow, TableRow, EditingBlock } from "./components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectEditingProduct } from "../../Redux/selectors";
import { setEditingProduct } from "../../actions";
import { PAGINATIONS_LIMIT, ROLE } from "../../constants";
import { checkAccess, debounce } from "../../utils";
import { selectUserRole } from "../../Redux/selectors";
import { request } from "../../utils/request";
import { OrderTableRow } from "./components/order-table-row/order-table-row";

const ProductsManagmentContainer = forwardRef(({ className }, ref) => {
	const userRole = useSelector(selectUserRole);
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [shouldSearch, setShouldSearch] = useState(false);
	const [sort, setSort] = useState("");
	const [typeView, setTypeView] = useState("products");
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
			request(
				`/products?search=${searchPhrase}&limit=${PAGINATIONS_LIMIT}&page=${page}&sort=${sort}`,
			),
			request("/categories"),
			request("/orders"),
		])
			.then(([productsResponse, categoriesResponse, ordersResponse]) => {
				setLoading(false);
				if (
					productsResponse.error ||
					categoriesResponse.error ||
					ordersResponse.error
				) {
					setErrorMessage(
						productsResponse.error ||
							categoriesResponse.error ||
							ordersResponse.error,
					);
					return;
				}
				setProducts(productsResponse.data.products);
				setCategories(categoriesResponse.data);
				setOrders(ordersResponse.data.orders);
				setLastPage(productsResponse.data.lastPage);
				if (page > productsResponse.data.lastPage && page !== 1) {
					setPage(productsResponse.data.lastPage);
				}
			})
			.catch((error) => {
				setLoading(false);
				setErrorMessage("Ошибка при загрузке данных.");
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, userRole, shouldSearch]);

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

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 1000),
		[],
	);

	const startDelayed = useMemo(() => debounce(setShouldSearch, 100), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const sortOnClick = () => {
		let sortingType = sort === "" ? "asc" : sort === "asc" ? "desc" : "";
		setSort(sortingType);
		startDelayed(!shouldSearch);
	};

	const handleChange = (event) => {
		const { value } = event.target;
		setTypeView(value);
	};

	return (
		<div className={className} ref={ref}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<Loader isVisible={loading} />

				<div
					className="selector-element"
					style={{
						display: "flex",
						width: "100%",
						justifyContent: "center",
					}}
				>
					<H2 className={"header"} margin={"40px 0 40px 150px"}>
						Управление продуктами
					</H2>
					<Select
						name="options"
						value={typeView}
						onChange={handleChange}
						width="150px"
						margin="40px 10px"
					>
						<option key={"typeView_0"} value={"products"}>
							Продукты
						</option>
						<option key={"typeView_1"} value={"orders"}>
							Заказы
						</option>
					</Select>
				</div>
				<div className="product-managment-content">
					{typeView === "products" && (
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
					)}
					{typeView === "products" && (
						<div className="products-element">
							<SearchRow
								searchPhrase={searchPhrase}
								onChange={onSearch}
							></SearchRow>
							<Button
								width={"100%"}
								fontSize={"22px"}
								height={"50px"}
								margin={"0 0 10px 0"}
								onClick={sortOnClick}
							>
								<div
									style={{
										display: "flex",

										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<span>Отсортировать по стоимости </span>
									<SortArrow sort={sort}></SortArrow>
								</div>
							</Button>
							<div className="table-product">
								<TableRow className="table-header">
									<div className="id-column">id</div>
									<div className="name-column">
										Наименование
									</div>
									<div className="category-column">
										Категория
									</div>
									<div className="price-column">
										Стоимость
									</div>
									<div className="count-column">
										Количество
									</div>
									<div className="image-column">Фото</div>
									<div className="actions-column">
										Действия
									</div>
								</TableRow>
								{products.length ? (
									<div className="table-product-body">
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
																String(
																	category.id,
																),
														)[0]
													}
													price={price}
													count={count}
													image_url={image_url}
													categories={categories}
													product={
														memoizedProductOnEditing
													}
													products={products}
													setProducts={setProducts}
													setProductState={
														setProductState
													}
													clearEditingProduct={
														clearEditingProduct
													}
													page={page}
													setPage={setPage}
													setLastPage={setLastPage}
													setLoading={setLoading}
													searchPhrase={searchPhrase}
													sort={sort}
												></ProductTableRow>
											),
										)}
									</div>
								) : (
									<div className="no-products-found">
										Продукты не найдены
									</div>
								)}
								<Pagination
									className="pagination"
									page={page}
									setPage={setPage}
									lastPage={lastPage}
								></Pagination>
							</div>
						</div>
					)}
					{typeView === "orders" && (
						<div className="orders-element">
							<div className="table-orders">
								<TableRow className="table-orders-header">
									<div className="id-column">id</div>
									<div className="user-column">
										Пользователь
									</div>
									<div className="amount-column">Сумма</div>
									<div className="quantity-column">
										Количество
									</div>
									<div className="time-column">
										Время заказа
									</div>
								</TableRow>
								{orders.length ? (
									<div className="table-orders-body">
										{orders.map(
											({
												id,
												user,
												category,
												totalAmount,
												totalQuantity,
												orderTime,
											}) => (
												<OrderTableRow
													key={id}
													id={id}
													user={user}
													category={category}
													totalAmount={totalAmount}
													totalQuantity={
														totalQuantity
													}
													orderTime={orderTime}
												></OrderTableRow>
											),
										)}
									</div>
								) : (
									<div className="no-order-found">
										Заказов нет
									</div>
								)}
							</div>
						</div>
					)}
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
	}

	& .table-product {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	& .table-product-body {
		overflow-y: auto;
		overflow-x: hidden;
		height: 61.3vh;
		max-width: 1240px;
	}

	& .table-orders-body {
		overflow-y: auto;
		overflow-x: hidden;
		height: 75vh;
	}

	& .pagination {
		margin: 10px 10px 10px 290px;
	}

	& .no-products-found {
		text-align: center;
		font-size: 24px;
		margin-top: 20px;
	}

	& .no-order-found {
		text-align: center;
		font-size: 24px;
		margin-top: 20px;
	}

	& .products-element {
		margin-right: 10px;
	}

	& .editing-block {
		margin-left: -350px;
	}
`;
