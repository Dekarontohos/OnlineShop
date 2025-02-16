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
			sort,
			setSort,
			sortOnClick,
			searchPhrase,
			onSearch,
		},
		ref,
	) => {
		const location = useLocation();

		useEffect(() => {
			setSort("");
		}, [location.pathname, setSort]);

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
						{sortArrow}
					</div>
				</Button>
				{products.length ? (
					<div className="products-cells">
						{products.map(({ id, name, price, image_url }) => (
							<ProductElement
								key={id}
								id={id}
								name={name}
								price={price}
								image_url={image_url}
							></ProductElement>
						))}
					</div>
				) : (
					<div className="no-products-found">Продукты не найдены</div>
				)}
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
		height: 66.7vh;
		max-width: 800px;
	}
`;
