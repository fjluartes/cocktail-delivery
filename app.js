const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

mongoose.connection.once('open', () => {
  console.log("Connected to mongodb atlas");
});
mongoose.connect(process.env.DB_CONN_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Successfully hosted");
});

const userRoutes = require('./routes/user');

app.use('/api/users', userRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
