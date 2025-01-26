import { forwardRef } from "react";
import styled from "styled-components";

const SelectContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <select className={className} {...props} ref={ref}></select>;
});

export const Select = styled(SelectContainer)`
	width: ${({ width = "100%" }) => width};
	height: 40px;
	margin: 0 0 10px;
	padding: 10px;
	border: 1px solid #000;
	font-size: 16px;
	border-radius: 5px;
	overflow: hidden;
`;
