import styled from "styled-components";

const H2Container = ({ children, className, fontSize, margin, ...props }) => (
	<h2 className={className} {...props}>
		{children}
	</h2>
);

export const H2 = styled(H2Container)`
	margin: ${({ margin = "40px;" }) => margin};
	display: flex;
	font-size: ${({ fontSize = "" }) => fontSize};
	align-items: center;
	flex-direction: column;
`;
