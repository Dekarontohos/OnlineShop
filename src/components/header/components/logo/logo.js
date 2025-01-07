import styled from "styled-components";
import { Icon } from "../../../../components";
import { Link } from "react-router-dom";

const LargeText = styled.div`
	font-size: 36px;
	font-weight: 500;
	line-height: 48px;
	margin-top: 10px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: 600;
`;

const LogoContainer = (
	{ className }, //className ОБЯЗАТЕЛЕН для стилизации уже существующего компонента на шаге 1 //comment
) => (
	<Link className={className} to="/">
		<Icon id="fa-shopping-cart" size="60px" margin="0 10px 0 0" />
		<div>
			<LargeText>Интернет-магазин</LargeText>
			<SmallText>Бытовая техника и электроника</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -10px;
`; // шаг 1
