import styled from "styled-components";

const ButtonContainer = ({
	children,
	className,
	width,
	fontSize,
	height,
	margin,
	backgroundColor,
	...props
}) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	font-size: ${({ fontSize = "18px;" }) => fontSize};
	width: ${({ width = "100%" }) => width};
	height: ${({ height = "28px;" }) => height};
	border: 1px solid #000;
	background-color: ${({ backgroundColor = "#eee" }) => backgroundColor};
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;
	margin: ${({ margin = "0" }) => margin};
	&:hover {
		background-color: #dcdcdc;
		cursor: pointer;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	}
	&:active {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
`;
