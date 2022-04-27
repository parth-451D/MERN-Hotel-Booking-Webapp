const express = require("express");
const moment = require("moment");
const stripe = require("stripe")("sk_test_51KrKqWAkxZlmM5wVJ4RalMGFCVIPaRhDMhmtgEEGi6JAjthCDCXagtJdWr14JUX1Al2fVXKE64i2mo5fhZjBIvJ600f0LcrRAB"); //
const { v4: uuidv4 } = require("uuid"); 

const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");
const Hotel = require("../models/hotel");

router.post("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });

    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/bookroom", async (req, res) => {
  // console.log("body = ",req.body);
  try {
    const { room, userid, hotelid, fromdate, todate, totalAmount, totaldays, token } =
      req.body;
    try {
      //create customer
      // console.log("token = ",token);
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      //charge payment
      // console.log("customer = ",customer);
      const payment = await stripe.charges.create(
        {
          amount: totalAmount * 100,
          customer: customer.id,
          currency: "USD",
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuidv4(),
        }
      );

      //Payment Success
      if (payment) {
        // console.log("paymrnt sucess");
        try {
          const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            hotelid,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalamount: totalAmount,
            totaldays,
            transactionid: uuidv4(),
          });
          // console.log("object success = ",newBooking)
          const booking = await newBooking.save();
          // console.log("booking success = ",booking)
          const roomTmp = await Room.findOne({ _id: room._id });
          roomTmp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          });

          await roomTmp.save();
          // console.log("room success = ",roomTmp)
          const hotelTmp = await Hotel.findByIdAndUpdate(hotelid,
            {
              $push:  {booking_id:  booking._id},
            },
            { new: true }
          );
          // console.log("hotel success = ",hotelTmp)
          // res.send(hotelTmp);
          res.send("Payment Successful, Your Room is booked");
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


router.get("/gethotelbookings/:id", async (req, res) => {
  try {
    const hotels = await Hotel.findById(req.params.id);
    let booking_info_store = [];
    const booking_info = hotels.booking_id; 
    const len = hotels.booking_id.length;
    for(i=len-1;i>=0;i--){
      const temp = await Booking.findById(booking_info[i]);
      if(temp != null){
        booking_info_store.push(temp);
      }
      else{
        continue;
      }
    }
    res.send(booking_info_store);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


module.exports = router;
