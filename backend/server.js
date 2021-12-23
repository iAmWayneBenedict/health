const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const healthRouter = require("./routes/health");

// mongodb connection
const uri = process.env.ATLAS_URI;
mongoose
	.connect(uri)
	.then((result) =>
		app.listen(port, console.log(`Connected to the server on port ${port}`))
	)
	.catch((err) => console.log(err));

app.use("/health", healthRouter);
