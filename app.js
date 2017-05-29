'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Genre = require('./models/genre');
var Book = require('./models/book');
var jwt = require('express-jwt');
//var bcrypt = require('bcryptjs');

//Connect to Mongoose
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/bookstore');

var db = mongoose.connection;

app.get('/', function (req, res) {
	res.send('Testing server');

});

app.get("/api/genres", function (req, res) {
	Genre.getGenres(function (err, genres) {
		if (err) {
			throw err;
		}
		res.json(genres);
	});
});

//POST Genres
app.post("/api/genres", function (req, res) {
	if(!req.body){
		return res.sendStatus(400);
	}
	var genre = req.body;
	Genre.addGenres(genre, function (err, genre) {
		if (err) {
			throw err;
		}
		res.json(genre);
	});
});

//POST Book
app.post("/api/books", function (req, res) {
	if(!req.body){
		return res.sendStatus(400);
	}
	var book = req.body;

	Book.addBook(book, function (err, book) {
		if (err) {
			throw err;
		}
		res.json(book);
	});
});

app.get("/api/books", function (req, res) {
	Book.getBooks(function (err, books) {
		if (err) {
			throw err;
		}
		res.json(books);
	});
});

app.get("/api/books/:_id", function (req, res) {
	Book.getBookById(req.params._id, function (err, book) {
		if (err) {
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log("Success server connected");
