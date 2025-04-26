import { forwardRef, useEffect, useState, useMemo } from "react";
import { PrivateContent, H2, Pagination, Loader } from "../../components";
import styled from "styled-components";
import { FilterCategoryBlock, ProductView } from "./components";
import { PAGINATIONS_LIMIT } from "../../constants";
import { debounce } from "../../utils";
import { request } from "../../utils/request";

const ProductsListContainer = forwardRef(({ className }, ref) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [filterCategory, setFilterCategory] = useState(null);
	const [sort, setSort] = useState("");
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		Promise.all([
			request(
				`/products?search=${searchPhrase}&limit=${PAGINATIONS_LIMIT}&page=${page}${filterCategory ? `&categoryId=${filterCategory?.id}` : ""}&sort=${sort}`,
			),
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
				setProducts(productsResponse.data.products);
				setCategories(categoriesResponse.data);
				setLastPage(productsResponse.data.lastPage);
			})
			.catch(() => {
				setLoading(false);
				setErrorMessage("Ошибка при загрузке данных.");
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 1000),
		[],
	);

	const startDelayed = useMemo(() => debounce(setShouldSearch, 100), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const categoryOnClick = (id) => {
		if (id === filterCategory?.id) {
			setFilterCategory(null);
			startDelayed(!shouldSearch);
		} else {
			const selectedCategories = categories.filter(
				(category) => category.id === id,
			)[0];
			setFilterCategory(selectedCategories);
			startDelayed(!shouldSearch);
		}
	};

	const sortOnClick = () => {
		let sortingType = sort === "" ? "asc" : sort === "asc" ? "desc" : "";
		setSort(sortingType);
		startDelayed(!shouldSearch);
	};

	return (
		<div className={className} ref={ref}>
			<PrivateContent serverError={errorMessage}>
				<Loader isVisible={loading} />
				<H2 className={"header"} margin={"40px 0"}>
					Список продуктов
				</H2>
				<div
					style={{
						display: "flex",
						marginLeft: "-350px",
					}}
				>
					<FilterCategoryBlock
						className="filter-category-block"
						categories={categories}
						filterCategory={filterCategory}
						setFilterCategory={setFilterCategory}
						categoryOnClick={categoryOnClick}
					></FilterCategoryBlock>
					<div>
						<ProductView
							className="product-view"
							products={products}
							sort={sort}
							setSort={setSort}
							sortOnClick={sortOnClick}
							searchPhrase={searchPhrase}
							onSearch={onSearch}
						></ProductView>
					</div>
				</div>
				{lastPage > 1 &&
					products.length <= PAGINATIONS_LIMIT &&
					products.length > 0 && (
						<Pagination
							className="pagination"
							page={page}
							setPage={setPage}
							lastPage={lastPage}
						></Pagination>
					)}
			</PrivateContent>
		</div>
	);
});

export const ProductsList = styled(ProductsListContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	font-size: 18px;

	& .filter-category-block {
		display: flex;
	}

	& .product-view {
		display: flex;
		flex-direction: column;
	}

	& .no-products-found {
		text-align: center;
		font-size: 24px;
		margin-top: 20px;
	}
`;
