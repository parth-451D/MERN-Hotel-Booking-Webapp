const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    star: { type: Number, required: true },
    description: { type: String, required: true },
    m_email : { type : String , required: true },
    m_password : { type : String , required: true },
    rooms: { type: Array },
    address : {type:String , required : true},
    booking_id : { type : Array},
    image :{type : String },
    tagline : {type : String}
  },
  { timestamps: true }
);

const hotelModel = mongoose.model("hotels", hotelSchema);

module.exports = hotelModel;
