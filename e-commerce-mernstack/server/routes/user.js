const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
	res.json({
		status: "User's alive",
	});
});

module.exports = router;
