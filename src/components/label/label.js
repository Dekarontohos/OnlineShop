import styled from "styled-components";

const LabelContainer = ({ children, className, ...props }) => (
	<label className={className} {...props}>
		{children}
	</label>
);

export const Label = styled(LabelContainer)`
	text-align: center;
	font-size: 18px;
	font-weight: 600;
`;
