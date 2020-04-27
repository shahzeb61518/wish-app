const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// Get routes object=> to get access to the routes
const wishRoutes = require('./routes/wish-routes');
const userRoutes = require('./routes/user-routes');
const app = express();


const url = "mongodb+srv://shahzeb:shahzeb123@cluster0-tlmv5.mongodb.net/post-data?retryWrites=true&w=majority";
mongoose.connect(url, (err, db) => {
  if (err) throw console.log('err>>>', err);
  console.log("DB is Connected");
});


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.use('/api/wish', wishRoutes);
app.use('/api/user', userRoutes);

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found',
    data: null
  });
})

console.log("server is running");

module.exports = app;
