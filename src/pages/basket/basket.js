import { styled } from "styled-components";
import { Content, H2 } from "../../components";
import { useEffect, useState } from "react";
import { ProductInBusketView } from "./components/products-in-busket-view/products-in-busket-view";
import { useSelector } from "react-redux";
import { selectProductsInBusket } from "../../Redux/selectors";

const BasketContainer = ({ className }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [sort, setSort] = useState("");
	const productsInBusket = useSelector(selectProductsInBusket);
	const [filteredProductsInBusket, setFiltredProductsInBusket] =
		useState(productsInBusket);
	const [stateFilterName, setstateFilterName] = useState("");

	useEffect(() => {
		filtersProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsInBusket, sort, stateFilterName]);

	const getSort = (arrayForSort, sortingType) => {
		if (sortingType === "+") {
			arrayForSort.sort((a, b) => {
				return a.price - b.price;
			});
		} else if (sortingType === "-") {
			arrayForSort.sort((a, b) => {
				return b.price - a.price;
			});
		} else {
			arrayForSort.sort((a, b) => {
				return a.id - b.id;
			});
		}
	};

	const filtersProduct = (valuefilterName) => {
		const locFilterName = valuefilterName
			? valuefilterName
			: stateFilterName;
		const filterResult = productsInBusket.filter((product) => {
			const matchesName =
				locFilterName === "" ||
				product.name
					.toLowerCase()
					.includes(locFilterName.toLowerCase());
			return matchesName;
		});
		getSort(filterResult, sort);
		setFiltredProductsInBusket(filterResult);
	};

	const filterNameOnChange = (event) => {
		setstateFilterName(event.target.value);
		let filter = event.target.value;
		filtersProduct(filter);
	};

	const sorting = () => {
		let sortingType = sort === "" ? "+" : sort === "+" ? "-" : "";
		setSort(sortingType);
		let sortProducts = filteredProductsInBusket;
		getSort(sortProducts, sortingType);
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2 className={"header"} margin={"40px 0"}>
					Корзина
				</H2>
				<div>
					<ProductInBusketView
						className="product-view"
						products={filteredProductsInBusket}
						sort={sort}
						setSort={setSort}
						sortOnClick={sorting}
						filterNameOnChange={filterNameOnChange}
					></ProductInBusketView>
				</div>
			</Content>
		</div>
	);
};

export const Basket = styled(BasketContainer)`
	font-size: 18px;
`;
