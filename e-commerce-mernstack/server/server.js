const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

//app
const app = express();

//db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connected');
	})
	.catch((err) => console.log('connection failed', err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cors());

//route middlewares
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`App is running on ${port}`);
});
