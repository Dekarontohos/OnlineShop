import { forwardRef, useEffect, useState } from "react";
import { Content, H2 } from "../../components";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { FilterCategoryBlock } from "./components/filter-category-block/filter-category-block";
import { ProductView } from "./components/products-view/products-view";

const ProductsListContainer = forwardRef(({ className }, ref) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [filterCategory, setFilterCategory] = useState(null);
	const [filterName, setFilterName] = useState("");
	const [filteredProducts, setFiltredProducts] = useState([]);
	const [sort, setSort] = useState("");

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
			productsResponse.response.sort((a, b) => {
				return a.id - b.id;
			});
			setProducts(productsResponse.response);
			setFiltredProducts(productsResponse.response);
			setCategories(categoriesResponse.response);
		});
	}, [requestServer]);

	const filtersProduct = (valuefilterName, valuefilterCategory) => {
		const locFilterName =
			valuefilterName === null
				? ""
				: valuefilterName
					? valuefilterName
					: filterName;

		const locFilterCategory =
			valuefilterCategory === ""
				? null
				: valuefilterCategory
					? valuefilterCategory
					: filterCategory;
		const filterResult = products.filter((product) => {
			const matchesName =
				locFilterName === "" ||
				product.name.toLowerCase().includes(locFilterName);
			const matchesCategory =
				!locFilterCategory ||
				String(product.category) === locFilterCategory.id;
			return matchesName && matchesCategory;
		});

		setFiltredProducts(filterResult);
	};

	const categoryOnClick = (id) => {
		if (id === filterCategory?.id) {
			setFilterCategory(null);
			filtersProduct("", "");
		} else {
			const selectedCategories = categories.filter(
				(category) => category.id === id,
			)[0];
			setFilterCategory(selectedCategories);
			filtersProduct("", selectedCategories);
		}
	};

	const filterNameOnChange = (event) => {
		setFilterName(event.target.value);
		let filter = event.target.value;
		if (filter === "") {
			filtersProduct(null, null);
		} else {
			filtersProduct(filter, null);
		}
	};

	const sortOnClick = () => {
		let sortingType = sort === "" ? "+" : sort === "+" ? "-" : "";
		setSort(sortingType);
		let sortProducts = filteredProducts;
		if (sortingType === "+") {
			sortProducts.sort((a, b) => {
				return a.price - b.price;
			});
		} else if (sortingType === "-") {
			sortProducts.sort((a, b) => {
				return b.price - a.price;
			});
		} else {
			sortProducts.sort((a, b) => {
				return a.id - b.id;
			});
		}
	};

	return (
		<div className={className} ref={ref}>
			<Content error={errorMessage}>
				<H2 className={"header"} margin={"40px 0"} fontSize={"27px"}>
					Список продуктов
				</H2>
				<div style={{ display: "flex", marginLeft: "-350px" }}>
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
							products={filteredProducts}
							setProducts={setProducts}
							sort={sort}
							setSort={setSort}
							categories={categories}
							filterNameOnChange={filterNameOnChange}
							sortOnClick={sortOnClick}
						></ProductView>
					</div>
				</div>
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
`;
