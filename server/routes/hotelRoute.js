const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Hotel = require("../models/hotel");
const Booking = require("../models/booking")

router.get("/getallhotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.send(hotels);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// get specific hotel by id (working..)
router.get("/gethotel/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.send(hotel);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/gethotelrooms/:id", async (req, res) => {
  try {
    const hotels = await Hotel.findById(req.params.id);
    let room_info_store = [];
    const room_info = hotels.rooms;
    const len = hotels.rooms.length;
    for (i = len - 1; i >= 0; i--) {
      const temp = await Room.findById(room_info[i]);
      if (temp != null) {
        room_info_store.push(temp);
      } else {
        continue;
      }
    }
    res.send(room_info_store);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/deletehotelrooms/:id", async (req, res) => {
  try {
    const hotels = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { rooms: req.body.room_id },
      },
      { new: true }
    );
    res.send(hotels);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addhotel", async (req, res) => {
  try {
    const newHotel = req.body;
    console.log(req.body);
    const hotel = new Hotel();
    hotel.name = newHotel.name;
    hotel.star = newHotel.star;
    hotel.description = newHotel.description;
    hotel.m_email = newHotel.m_email;
    hotel.m_password = newHotel.m_password;
    hotel.rooms = newHotel.rooms;
    hotel.address = newHotel.address;
    hotel.booking_id = newHotel.booking_id;
    const result = await hotel.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

//get specific hotels booking (working..)
router.get("/gethotelbookings/:id", async (req, res) => {
  try {
    const hotels = await Hotel.findById(req.params.id);
    let booking_info_store = [];
    const booking_info = hotels.booking_id;
    const len = hotels.booking_id.length;
    for (i = len - 1; i >= 0; i--) {
      const temp = await Booking.findById(booking_info[i]);
      if (temp != null) {
        booking_info_store.push(temp);
      } else {
        continue;
      }
    }
    res.send(booking_info_store);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
