import styled from "styled-components";
import { Button, SearchRow, SortArrow } from "../../../../components";
import { forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductInBusketElement } from "./product-in-busket-element/product-in-busket-element";

const ProductInBusketViewContainer = forwardRef(
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
							<ProductInBusketElement
								key={product.id}
								product={product}
							></ProductInBusketElement>
						))}
					</div>
				) : (
					<div className="no-products-found">Продукты не найдены</div>
				)}
			</div>
		);
	},
);

export const ProductInBusketView = styled(ProductInBusketViewContainer)`
	border-radius: 5px;
	align-items: center;
	flex-direction: column;
	display: flex;
	text-align: center;
	height: max-content;
	width: 800px;

	& .products-cells {
		overflow-y: auto;
		overflow-x: hidden;
		height: 66.7vh;
		max-width: 800px;
	}
`;
