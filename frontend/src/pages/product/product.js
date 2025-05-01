import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadProductAsync } from "../../actions/load-product-async";
import { selectProduct } from "../../Redux/selectors";
import { Error, H2, Loader } from "../../components";
import styled from "styled-components";
import { ProductCard } from "./components/product-card";

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const product = useSelector(selectProduct);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(loadProductAsync(params.id)).then((productData) => {
			setError(productData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id]);

	if (isLoading) {
		return <Loader isVisible={isLoading} />;
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
