import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";

import Hotels from "../components/Hotels";
import Loader from "../components/Loader";
import Error from "../components/Error";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useHistory } from "react-router-dom";
// ..
AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;

function HotelsPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);
  const [duplicatHotel, setDuplicateHotel] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/hotels/getallhotels")).data;
        //console.log(data);
        setHotels(data);
        setDuplicateHotel(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  const handleShow = (id) => {
    console.log(id);
    history.push(`hotelview/${id}`)
  }


  function filterBySearch() {
    const tempHotels = duplicatHotel.filter((x) =>
      x.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setHotels(tempHotels);
  }
  // function filterByType(type) {
  //   setType(type);
  //   console.log(type);
  //   if (type !== "all") {
  //     const tempHotels = duplicateHotel.filter(
  //       (x) => x.type.toLowerCase() == type.toLowerCase()
  //     );
  //     setHotels(tempHotels);
  //   } else {
  //     setHotels(duplicateHotel);
  //   }
  // }

  return (
    <div className=" hotel" >
      <div className="row bs">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search Hotels"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={type}
            // onChange={(e) => {
            //   filterByType(e.target.value);
            // }}
          >
            <option value="all">All</option>
            <option value="3 or below 3">3 or Below 3</option>
            <option value="above 3">above 3</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center ">
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          hotels.map((x) => {
            return (
              <div className="col-md-9 mt-2" data-aos="flip-down">
                <Hotels hotel={x}  handleShow={handleShow} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HotelsPage;
