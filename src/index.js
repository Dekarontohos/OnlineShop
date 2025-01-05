import React from "react";
import ReactDOM from "react-dom/client";
import { OnlineShop } from "./OnlineShop";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<OnlineShop />
	</BrowserRouter>,
);
