const mongoose = require("mongoose");

//PLEASE EDIT YOUR MONGO DB CONNECTION HERE
/*YOU CAN FIND SAMPLE COLLECTION at mongodb_collections folder */
var mongoURL = "mongodb+srv://parth:Naruto@4501@cluster0.56u09.mongodb.net/hotel_data?retryWrites=true&w=majority";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
  
var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

module.exports = mongoose;
