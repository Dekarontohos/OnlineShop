import React from "react";
import "./App.css";
import styled from "styled-components";

const Div = styled.div`
	text-align: center;
`;

export const App = () => {
	return (
		<div>
			<i className="fa fa-camera-retro"></i>
			123
			<Div>123</Div>
		</div>
	);
};
