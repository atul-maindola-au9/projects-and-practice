const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: 'Name is required',
			minlenght: [2, 'Too Short'],
			maxlength: [32, 'Too Long'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
	},
	{ timestamp: true }
);

const Category = mongoose.model('Categories', categorySchema);
module.exports = Category;
