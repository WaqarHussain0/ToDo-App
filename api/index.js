const express = require('express');
const cors = require('cors');
const itemRouter = require('./router/items');
const connectDB = require('./db');
const { json } = require('express');

const app = express();
app.use(cors());
app.use(json());

connectDB();

app.use('/items', itemRouter);


app.listen(3000, () => console.log('Listening to port 3000'));