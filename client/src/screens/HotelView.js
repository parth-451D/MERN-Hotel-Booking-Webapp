import { DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import Error from "../components/Error";
import HotelRoom from "../components/HotelRoom";
import Loader from "../components/Loader";
import "./HotelView.css";
const HotelView = (hotel) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);
  const [hoteldata, setHoteldata] = useState([]);
  const hid = useParams();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [duplicateHotel, setDuplicateHotel] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  const { RangePicker } = DatePicker;
  const images = [
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/160243554.jpg?k=29d816c579f87d3b0391dc7676987e1cbf833dd9ee807b5255e2d038a9349038&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/160243586.jpg?k=eddcbfccd0ab14a489c4627d1dfcad5a4deef1b36d5863c38a44ef35e92a7c5d&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/277978783.jpg?k=dfe35de8024ca6349a341007086f1951be2c6e1181fd185ce9c85863469436f4&o=",
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const data = (await axios.get("/api/hotels/gethotelrooms/" + hid.id))
          .data;
        setError("");
        setLoading(true);
        console.log(data);
        setRooms(data);
        setDuplicateRooms(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);

     const const2 = (await (axios.get("/api/hotels/gethotel/" + hid.id))).data;
     console.log(const2);
     setHoteldata(const2);
    }

    console.log(hid);
    fetchMyAPI();
  }, []);

  function filterByDate(dates) {
    // console.log(moment(dates[0]).format("DD-MM-YYYY"));
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
    try {
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
      setToDate(moment(dates[1]).format("DD-MM-YYYY"));

      var tempRooms = [];
      for (const room of duplicateRooms) {
        var availability = false;
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              ) &&
              !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) {
              if (
                moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        //
        if (availability == true || room.currentbookings.length == 0) {
          tempRooms.push(room);
        }
      }
      setRooms(tempRooms);
    } catch (error) {}
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((x) =>
      x.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  }
  function filterByType(type) {
    setType(type);
    console.log(type);
    if (type !== "all") {
      const tempRooms = duplicateRooms.filter(
        (x) => x.type.toLowerCase() == type.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div className="Rooms">
      {/* {console.log(hoteldata)} */}
      <header
        className="header-main"
        style={{
          backgroundImage:
            "url(" +
            "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/160243554.jpg?k=29d816c579f87d3b0391dc7676987e1cbf833dd9ee807b5255e2d038a9349038&o=" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* {console.log(loading)}
        {loading === false
          ? console.log("name ", hoteldata[0].name)
          : console.log(0)} */}
        <div className="header-content">
          <h2 className="alt-font">{hoteldata.name}</h2>
          <p>{hoteldata.tagline}</p>          
        </div>
      </header>

      <section className="desc">
        <h1 className="alt-font">Be Captivated</h1>
        <p>
          Choose between spectacular balcony views of The Villa or our resort’s
          private Beach Resort and Oceanside View, from the largest hotel rooms
          in Phuket.
        </p>
      </section>

      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>
      {/* {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          hoteldata.map((x) => {
            return (
              <div className="col-md-9 mt-3" data-aos="flip-down">
                <HotelRoom room={x} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )} */}
        <section className="flex-row-lg">
      {rooms.map((room) => {
        return (
            <article className="card">
              {/* <Link to='/'> */}
              {fromDate && toDate && (
            <Link  to={`/book/${hoteldata._id}/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn-alt book">Book Now</button>
            </Link>
          )}
              <button className="btn-alt" onClick={handleShow}>
                EXPLORE
              </button>
              {/* </Link> */}
              <div>
                <h1 className="alt-font">{room.name}</h1>
                <p>{room.description}</p>
              </div>
              <div className="img-container">
                <img
                  src={room.imageurls[0]}
                  alt="image"
                />
                {/* {console.log(rooms)} */}
              </div>
            </article>
            
            );
          })}
          </section>
      {/* modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>hgfdsdfgh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {images.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p> */}
          <h3>Room Type : delux</h3> <br />
          <h2>Price : 5000 per day</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HotelView;
