import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";

const HotelRoom = (room) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const images = [
        "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/160243554.jpg?k=29d816c579f87d3b0391dc7676987e1cbf833dd9ee807b5255e2d038a9349038&o=",
        "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/160243586.jpg?k=eddcbfccd0ab14a489c4627d1dfcad5a4deef1b36d5863c38a44ef35e92a7c5d&o=",
        "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/277978783.jpg?k=dfe35de8024ca6349a341007086f1951be2c6e1181fd185ce9c85863469436f4&o=",
      ];
  
  return (
      <div>
        {console.log(room)}
      <section className="flex-row-lg">
        <article className="card">
          {/* <Link to='/'> */}
          <button className="btn-alt" onClick={handleShow}>
            EXPLORE
          </button>
          {/* </Link> */}
          <div>
              {/* {console.log(room.name)} */}
            <h1 className="alt-font">{room.name}</h1>
            <p>{room.description}</p>
          </div>
          <div className="img-container">
            <img
              src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/343857837.jpg?k=71847c6a14b2adf4bf5e19181402fcda3b4c7bf127430639115469bc6695846f&o="
              alt="image"
            />

          </div>
        </article>
        ;
      </section>

      {/* modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>room name</Modal.Title>
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
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

export default HotelRoom;
