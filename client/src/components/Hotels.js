import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HotelView from "../screens/HotelView";

function Room({ hotel, fromDate, toDate, handleShow }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
// const hid = { hotel._id}
  return (
    <div className="row bs1">
      <div className="col-md-4">
        <img src={hotel.image} className="smallimg" alt="" />
      </div>
      <div className="col-md-7">
        <h1>{hotel.name}</h1>
        <b>
          <p>Rating : {hotel.star} star</p>
          {/* <p>
            Description :
            <br /> {hotel.description}
          </p> */}
          <p>Address : {hotel.address}</p>
        </b>

        <div style={{ float: "right" }}>
          {/* {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary m-2">View Hotel</button>
            </Link>
          )} */}
          {/* <Link to='/hotelview/:hid'> */}
            <button className="btn btn-primary" onClick={() => handleShow(hotel._id , hotel)}>
              View Detail
            </button>
          {/* </Link> */}
        </div>
      </div>

      {/* <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
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
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

export default Room;
