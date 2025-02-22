import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useServerRequest } from "../../hooks";
import { loadProductAsync } from "../../actions/load-product-async";
import { selectProduct } from "../../Redux/selectors";
import { H2 } from "../../components";
import styled from "styled-components";
import { ProductCard } from "./components/product-card";

const ProductContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const product = useSelector(selectProduct);

	useEffect(() => {
		dispatch(loadProductAsync(requestServer, params.id));
	}, [requestServer, dispatch, params.id]);

	return (
		<div className={className}>
			<H2 className={"header"} margin={"40px 0"}>
				Карточка продукта
			</H2>
			<ProductCard
				className={"product-card"}
				product={product}
			></ProductCard>
		</div>
	);
};

export const Product = styled(ProductContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;
