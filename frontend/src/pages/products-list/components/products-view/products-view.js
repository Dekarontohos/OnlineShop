import styled from "styled-components";
import { Button, SearchRow, SortArrow } from "../../../../components";
import { forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductElement } from "./product-element/product-element";
import PropTypes from "prop-types";

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
						<SortArrow sort={sort}></SortArrow>
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
	width: 900px;

	& .products-cells {
		overflow-y: auto;
		overflow-x: hidden;
		height: 66.1vh;
		max-width: 900px;
	}
`;

ProductView.propTypesropTypes = {
	products: PropTypes.array.isRequired,
	sort: PropTypes.string,
	setSort: PropTypes.func,
	sortOnClick: PropTypes.func,
	searchPhrase: PropTypes.func,
	onSearch: PropTypes.func,
};
