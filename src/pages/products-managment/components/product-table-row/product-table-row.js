import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL, openModal, setEditingProduct } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";
import {
	MAIN_BACKGROUND_SECOND_COLOR_THEME,
	PAGINATIONS_LIMIT,
} from "../../../../constants";
import { getLastPageFromLinks } from "../../../../utils/get-last-page-from-links";
import PropTypes from "prop-types";

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
	product,
	products,
	setProducts,
	clearEditingProduct,
	setProductState,
	page,
	setLastPage,
	setPage,
	setLoading,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const editOnClick = (product) => {
		setProductState({
			name: "",
			category: "",
			price: 0,
			count: 0,
			image_url: "",
		});
		dispatch(setEditingProduct(product));
	};

	const asyncRemoveProduct = async (id) => {
		setLoading(true);
		requestServer("removeProduct", id)
			.then(() => {
				requestServer(
					"fetchProducts",
					products.length > 1 ? page : page - 1,
					PAGINATIONS_LIMIT,
				).then((result) => {
					setLoading(false);
					setProducts(result.response.products);
					const locLastPage = getLastPageFromLinks(
						result.response.links,
					);
					setLastPage(locLastPage);
					if (page > locLastPage) {
						setPage(locLastPage);
					}
				});
			})
			.catch(() => {
				setLoading(false);
			});
		if (id === product.id) {
			clearEditingProduct();
		}
	};

	const deleteOnClick = (id) => {
		dispatch(
			openModal({
				text: "Удалить продукт?",
				onConfirm: () => {
					asyncRemoveProduct(id);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div
			className={className}
			style={{
				backgroundColor: id === product.id ? "lightgrey" : "",
			}}
		>
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
				<Icon
					id="fa fa-trash-o"
					margin="0 0 0 10px"
					size="26px"
					onClick={() => deleteOnClick(id)}
				></Icon>
			</div>
		</div>
	);
};

export const ProductTableRow = styled(ProductTableRowContainer)`
	display: flex;
	padding: 10px;
	height: 120px;

	border-radius: 10px;
	background-color: ${MAIN_BACKGROUND_SECOND_COLOR_THEME};
	margin-bottom: 10px;
	width: 1020px;

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
		margin: auto 20px auto 0;
	}
`;

ProductTableRow.propTypesropTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	count: PropTypes.number.isRequired,
	image_url: PropTypes.string.isRequired,
	categories: PropTypes.array.isRequired,
	product: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired,
	setProducts: PropTypes.func.isRequired,
	clearEditingProduct: PropTypes.func.isRequired,
	setProductState: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	setLastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
