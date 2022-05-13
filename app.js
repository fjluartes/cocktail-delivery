const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Successfully hosted");
});

mongoose.connection.once('open', () => {
  console.log("Connected to mongodb atlas");
});
mongoose.connect(process.env.DB_CONN_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/client');
const storeRoutes = require('./routes/store');
const orderRoutes = require('./routes/order');
const itemRoutes = require('./routes/item');

app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
module.exports = app;
