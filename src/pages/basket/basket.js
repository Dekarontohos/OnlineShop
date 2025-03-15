import { styled } from "styled-components";
import { H2, Loader } from "../../components";
import { useEffect, useState } from "react";
import { ProductInBasketView } from "./components/products-in-basket-view/products-in-basket-view";
import { useSelector } from "react-redux";
import { selectProductsInBasket } from "../../Redux/selectors";
import { FunctionalPanel } from "./components/products-in-basket-view/functional-panel/functional-panel";

const BasketContainer = ({ className }) => {
	const [sort, setSort] = useState("");
	const productsInBasket = useSelector(selectProductsInBasket);
	const [filteredProductsInBasket, setFiltredProductsInBasket] =
		useState(productsInBasket);
	const [stateFilterName, setstateFilterName] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		filtersProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsInBasket, sort, stateFilterName]);

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
		const filterResult = productsInBasket.filter((product) => {
			const matchesName =
				locFilterName === "" ||
				product.name
					.toLowerCase()
					.includes(locFilterName.toLowerCase());
			return matchesName;
		});
		getSort(filterResult, sort);
		setFiltredProductsInBasket(filterResult);
	};

	const filterNameOnChange = (event) => {
		setstateFilterName(event.target.value);
		let filter = event.target.value;
		filtersProduct(filter);
	};

	const sorting = () => {
		let sortingType = sort === "" ? "+" : sort === "+" ? "-" : "";
		setSort(sortingType);
		let sortProducts = filteredProductsInBasket;
		getSort(sortProducts, sortingType);
	};

	return (
		<div className={className}>
			<Loader isVisible={loading} />
			<H2 className={"header"} margin={"40px 0"}>
				Корзина
			</H2>
			<div style={{ display: "flex" }}>
				<ProductInBasketView
					className="product-view"
					products={filteredProductsInBasket}
					sort={sort}
					setSort={setSort}
					sortOnClick={sorting}
					filterNameOnChange={filterNameOnChange}
				></ProductInBasketView>
				<FunctionalPanel
					productsInBasket={productsInBasket}
					setLoading={setLoading}
				></FunctionalPanel>
			</div>
		</div>
	);
};

export const Basket = styled(BasketContainer)`
	font-size: 18px;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	justify-content: center;

	& .product-view {
		display: flex;
		margin-left: 370px;
	}
`;
