const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

// Указываем папку для статических файлов
app.use(express.static(path.join(__dirname, "public")));

// Указываем EJS как шаблонизатор
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Главный маршрут
app.get("/", (req, res) => {
	res.render("index", { title: "Главная страница" });
});

mongoose
	.connect("mongodb://user:mongopass@localhost:27017/testdb?authSource=admin")
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Сервер запущен на http://localhost:${PORT}`);
		});
	});

// Запускаем сервер
