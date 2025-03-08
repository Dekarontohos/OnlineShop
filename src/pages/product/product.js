import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useServerRequest } from "../../hooks";
import { loadProductAsync } from "../../actions/load-product-async";
import { selectProduct } from "../../Redux/selectors";
import { Error, H2 } from "../../components";
import styled from "styled-components";
import { ProductCard } from "./components/product-card";

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const product = useSelector(selectProduct);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(loadProductAsync(requestServer, params.id)).then(
			(productData) => {
				setError(productData.error);
				setIsLoading(false);
			},
		);
	}, [requestServer, dispatch, params.id]);

	if (isLoading) {
		return null;
	}

	return error ? (
		<Error error={error}></Error>
	) : (
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
