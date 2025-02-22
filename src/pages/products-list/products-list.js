import { forwardRef, useEffect, useState, useMemo } from "react";
import { Content, H2, Pagination } from "../../components";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { FilterCategoryBlock, ProductView } from "./components";
import { PAGINATIONS_LIMIT } from "../../constants";
import { getLastPageFromLinks, debounce } from "../../utils";

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

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([
			requestServer(
				"fetchProducts",
				page,
				PAGINATIONS_LIMIT,
				searchPhrase,
				filterCategory?.id,
				sort,
			),
			requestServer("fetchCategories"),
		]).then(([productsResponse, categoriesResponse]) => {
			if (productsResponse.error || categoriesResponse.error) {
				setErrorMessage(
					productsResponse.error || categoriesResponse.error,
				);
				return;
			}
			setProducts(productsResponse.response.products);
			setCategories(categoriesResponse.response);
			setLastPage(getLastPageFromLinks(productsResponse.response.links));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 1000),
		[],
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const categoryOnClick = (id) => {
		if (id === filterCategory?.id) {
			setFilterCategory(null);
			startDelayedSearch(!shouldSearch);
		} else {
			const selectedCategories = categories.filter(
				(category) => category.id === id,
			)[0];
			setFilterCategory(selectedCategories);
			startDelayedSearch(!shouldSearch);
		}
	};

	const sortOnClick = () => {
		let sortingType = sort === "" ? "+" : sort === "+" ? "-" : "";
		setSort(sortingType);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className} ref={ref}>
			<Content error={errorMessage}>
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
			</Content>
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
