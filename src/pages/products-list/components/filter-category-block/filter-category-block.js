import styled from "styled-components";
import { Button, H2 } from "../../../../components";
import { forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FilterCategoryBlockContainer = forwardRef(
	(
		{
			className,
			categories,
			filterCategory,
			setFilterCategory,
			categoryOnClick,
		},
		ref,
	) => {
		const location = useLocation();

		useEffect(() => {
			setFilterCategory(null);
		}, [location.pathname, setFilterCategory]);

		return (
			<div className={className} ref={ref}>
				<H2 fontSize={"22px;"} margin={"20px 0;"}>
					<span>Фильтр на категорию</span>
				</H2>
				{categories.map(({ id, name }) => (
					<Button
						key={id}
						id={id}
						width={"300px"}
						fontSize={"20px"}
						height={"60px"}
						margin={"0 0 20px 0"}
						onClick={() => categoryOnClick(id)}
						backgroundColor={() =>
							id === filterCategory?.id ? "#a9a9a9" : ""
						}
					>
						<span>{name}</span>
					</Button>
				))}
			</div>
		);
	},
);

export const FilterCategoryBlock = styled(FilterCategoryBlockContainer)`
	border-radius: 5px;
	padding: 10px;
	border: 2px solid #000;
	margin: 0 10px 0 0;
	width: 350px;
	align-items: center;
	flex-direction: column;
	display: flex;
	text-align: center;
	height: max-content;
`;
