const router = require("express").Router();

let Health = require("../models/health.model");

router.get("/", (req, res) => {
	Health.find()
		.then((response) => res.json(response))
		.catch((err) => console.log(err));
	// console.log("e");
});

router.post("/add", (req, res) => {
	console.log(req.body);
	const fullName = req.body.fullName;
	const temperature = req.body.temperature;
	const email = req.body.email;
	const phoneNumber = req.body.phoneNumber;

	const newHealthDeclaration = new Health({
		fullName,
		temperature,
		email,
		phoneNumber,
	});

	newHealthDeclaration
		.save()
		.then((result) => res.json("New Record Added"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
	let id = req.params.id;
	Health.findById(id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
	let id = req.params.id;
	Health.findByIdAndDelete(id)
		.then((result) => res.json("Record Deleted!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", (req, res) => {
	console.log(req.body);
	const fullName = req.body.fullName;
	const temperature = req.body.temperature;
	const email = req.body.email;
	const phoneNumber = req.body.phoneNumber;

	Health.findByIdAndUpdate(req.params.id, {
		fullName,
		temperature,
		email,
		phoneNumber,
	})
		.then((result) => res.json("User has been updated!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
