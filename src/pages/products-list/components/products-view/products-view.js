import styled from "styled-components";
import { Button, Icon, SearchRow } from "../../../../components";
import { forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductElement } from "./product-element/product-element";

const ProductViewContainer = forwardRef(
	(
		{
			className,
			products,
			setProducts,
			sort,
			setSort,
			categories,
			filterNameOnChange,
			sortOnClick,
		},
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

		let sortArrow = (
			<Icon
				id={
					sort === "+"
						? "fa-caret-up"
						: "Example of caret-down fa-caret-down"
				}
				margin="0 0 0 10px"
				size="26px"
				style={{ visibility: sort === "" ? "hidden" : "visible" }}
			></Icon>
		);

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
						{sortArrow}
					</div>
				</Button>
				<div className="products-cells">
					{products.map(
						({ id, name, category, price, count, image_url }) => (
							<ProductElement
								key={id}
								id={id}
								name={name}
								category={categories[category]}
								price={price}
								count={count}
								image_url={image_url}
								setProducts={setProducts}
							></ProductElement>
						),
					)}
				</div>
			</div>
		);
	},
);

export const ProductView = styled(ProductViewContainer)`
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
		max-height: 69vh;
		max-width: 800px;
	}
`;
