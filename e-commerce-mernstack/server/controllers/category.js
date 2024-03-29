const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		const category = await new Category({
			name,
			slug: slugify(name),
		}).save();
		console.log('category', category);
		res.json(category);
		// res.json(await new Category({ name, slug: slugify(name) }).save());
	} catch (err) {
		// console.log(err);
		res.status(400).send('Create category failed');
	}
};

exports.list = async (req, res) => {
	try {
		res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
	} catch (error) {
		res.status(400).send('data retrieval failed');
	}
};

exports.read = async (req, res) => {
	try {
		let category = await Category.findOne({ slug: req.params.slug }).exec();
		res.json(category);
	} catch (error) {
		res.status(400).send('Cannot read data');
	}
};

exports.update = async (req, res) => {
	const { name } = req.body;
	try {
		const updated = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		);
		res.json(updated);
	} catch (error) {
		res.status(400).send('data updation failed');
	}
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({
			slug: req.params.slug,
		});
		res.json(deleted);
	} catch (error) {
		res.status(400).send('data deletion failed');
	}
};
