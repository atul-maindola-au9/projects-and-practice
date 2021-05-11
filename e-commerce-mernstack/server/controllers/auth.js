const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
	const { name, picture, email } = req.user;

	const user = await User.findOneAndUpdate(
		{ email: email },
		{ name: name, picture: picture },
		{ new: true }
	);

	if (!user) {
		const newUser = await new User({
			email: email,
			name: name,
			picture: picture,
		}).save();
		console.log('user created', newUser);
		res.status(200).json(newUser);
	} else {
		console.log('user found', user);
		res.json(user);
	}
};

exports.currentUser = async (req, res) => {
	User.findOne({ email: req.user.email }).exec((err, user) => {
		if (err) throw new Error(err);
		res.json(user);
	});
};
