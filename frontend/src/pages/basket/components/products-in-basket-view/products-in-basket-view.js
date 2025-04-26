import styled from "styled-components";
import { Button, SearchRow, SortArrow } from "../../../../components";
import { forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductInBasketElement } from "./product-in-basket-element/product-in-basket-element";
import PropTypes from "prop-types";

const ProductInBasketViewContainer = forwardRef(
	(
		{ className, products, sort, setSort, sortOnClick, filterNameOnChange },
		ref,
	) => {
		const location = useLocation();

		useEffect(() => {
			setSort("");
		}, [location.pathname, setSort]);

		function debounce(func, delay) {
			let timeoutId;

			return function (...args) {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}

				timeoutId = setTimeout(() => {
					func.apply(this, args);
				}, delay);
			};
		}

		const searchFunction = debounce(filterNameOnChange, 300);

		return (
			<div className={className} ref={ref}>
				<SearchRow onChange={searchFunction}></SearchRow>
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
				{products.length ? (
					<div className="products-cells">
						{products.map((product) => (
							<ProductInBasketElement
								key={product.id}
								product={product}
							></ProductInBasketElement>
						))}
					</div>
				) : (
					<div className="no-products-found">Корзина пуста</div>
				)}
			</div>
		);
	},
);

export const ProductInBasketView = styled(ProductInBasketViewContainer)`
	border-radius: 5px;
	align-items: center;
	flex-direction: column;
	display: flex;
	text-align: center;
	height: max-content;
	width: 800px;
	margin-right: 10px;

	& .products-cells {
		overflow-y: auto;
		overflow-x: hidden;
		height: 66.7vh;
		max-width: 800px;
	}
`;

ProductInBasketView.propTypes = {
	products: PropTypes.array,
	sort: PropTypes.string,
	setSort: PropTypes.func,
	sortOnClick: PropTypes.func,
	filterNameOnChange: PropTypes.func,
};
