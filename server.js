const express = require('express');
const logger = require("morgan");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
//Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Public resources
app.use(express.static('public'));
//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
//Routes
app.use (require('./routes/apiRoutes'));
app.use (require('./routes/htmlRoutes'));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });


