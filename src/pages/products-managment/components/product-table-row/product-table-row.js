import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch } from "react-redux";
import { setEditingProduct } from "../../../../actions";

const mainStyles = `

		font-size: 20px;
		font-weight: 600;
		padding: 10px;
		margin: auto auto;
		`;

const textStyles = `text-align: center;`;

const numberStyles = `text-align: center;`;

const ProductTableRowContainer = ({
	className,
	id,
	name,
	category,
	price,
	count,
	image_url,
	categories,
}) => {
	const dispatch = useDispatch();

	const editOnClick = (product) => {
		dispatch(setEditingProduct(product));
	};

	return (
		<div className={className}>
			<div className="id-column">{id}</div>
			<div className="name-column">{name}</div>
			<div className="category-column">
				{
					categories.find(
						(categoryFromAraay) =>
							categoryFromAraay.id === category.id,
					).name
				}
			</div>
			<div className="price-column">{price}</div>
			<div className="count-column">{count}</div>
			<img src={image_url} alt={`image_${id}`} />
			<div className="actions-column">
				<Icon
					id="fa fa-pencil-square-o"
					margin="0 0 0 10px"
					size="26px"
					onClick={() =>
						editOnClick({
							id,
							name,
							category: Number(category.id),
							price,
							count,
							image_url,
						})
					}
				></Icon>
				<Icon id="fa fa-trash-o" margin="0 0 0 10px" size="26px"></Icon>
			</div>
		</div>
	);
};

export const ProductTableRow = styled(ProductTableRowContainer)`
	display: flex;
	padding: 10px;

	border-radius: 10px;
	background-color: #eee;
	margin-top: 10px;

	& .id-column {
		width: 80px;
		${mainStyles}
		${numberStyles}
	}

	& .name-column {
		width: 200px;
		${mainStyles}
		${textStyles}
	}

	& .category-column {
		width: 200px;
		${mainStyles}
		${textStyles}
	}

	& .price-column {
		width: 150px;
		${mainStyles}${numberStyles}
	}

	& .count-column {
		width: 150px;
		${mainStyles}${numberStyles}
	}

	& .image-column {
		width: 100px;
		${mainStyles}
	}
	& .actions-column {
		width: 100px;
		${mainStyles}
		display: flex;
		justify-content: space-between;
	}
`;
