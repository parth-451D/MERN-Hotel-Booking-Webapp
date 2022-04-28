import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./FinalHome.css";
const FinalHome = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/hotels/getallhotels")).data;
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <Fragment>
      <div className="home">
        <h1 className="alt-font head">Welcome to Comfort Rooms</h1>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          // style={
          //   ({
          //     marginTop: "5rem",
          //   })
          // }
        >
          <Carousel.Item>
            <img
              className="d-block w-80 caro"
              src="https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-80 caro"
              src="https://images.pexels.com/photos/2507025/pexels-photo-2507025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-80 caro"
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="Home">
          <section className="desc">
            <p>
              Experience the best user interface and functionality for booking
              the various rooms.
            </p>
          </section>
          <section className="desc_main" id="desc">
            <article className="descLeft">
              <div className="bg-light"></div>
              <h1 className="alt-font">Luxury Rooms</h1>
              <p>
                Luxury room features: High-quality furnishings with opulent,
                expensive touches, attention to aesthetic detail, a quiet room
                with fresh air, original art on the walls, windows that open,
                robes and slippers, adequate storage, hangers, desk, reading
                chair, safe, good-size flat-screen TV, iPhone/iPod dock, coffee
                maker, full-length mirror, effective heating/AC system…And of
                course a King bed with a good mattress, high-quality sheets and
                a variety of pillow types (or a pillow menu)!
              </p>
              <Link to="/hotels">
                <button className="btn" id="contrast">
                  Go To Hotels
                </button>
              </Link>
            </article>
            <div className="descRight">
              <img
                src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/160243448.jpg?k=e9aa7f3243ba6e8dae58d36999f732593cd291269f7f9884d9a79e2cdb903aa2&o=&hp=1"
                alt="home_resort"
              />
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default FinalHome;
