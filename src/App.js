// import logo from "./logo.svg";
// import "./App.css";

// export const App = () => {                //декларативный, императивного вроде бы нет
// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<img src={logo} className="App-logo" alt="logo" />
// 				<p>
// 					Edit <code>src/App.js</code> and save to reload.
// 				</p>
// 				<a
// 					className="App-link"
// 					href="https://reactjs.org"
// 					target="_blank"
// 					rel="noopener noreferrer"
// 				>
// 					Learn React
// 				</a>
// 				<p>{new Date().getFullYear()}</p>
// 			</header>
// 		</div>
// 	);
// };

import React from "react";
import "./App.css";

export const App = () => {
	return React.createElement(
		"div",
		{ className: "App" },
		React.createElement(
			"header",
			{ className: "App-header" },
			React.createElement(
				"p",
				null,
				"Edit ",
				React.createElement("code", null, "src/App.js"),
				" and save to reload.",
			),
			React.createElement(
				"a",
				{
					className: "App-link",
					href: "https://reactjs.org",
					target: "_blank",
					rel: "noopener noreferrer",
				},
				"Learn React",
			),
			React.createElement("p", null, new Date().getFullYear()),
		),
	);
};
