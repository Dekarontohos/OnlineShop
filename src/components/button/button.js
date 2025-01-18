import styled from "styled-components";

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = "100%" }) => width};
	height: 28px;
	border: 1px solid #000;
	background-color: #eee;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;
	&:hover {
		background-color: #dcdcdc;
		cursor: pointer;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	}
	&:active {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
`;
