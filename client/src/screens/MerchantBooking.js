import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";

function MerchantBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "transactionid",
      dataIndex: "transactionid",
      key: "transactionid",
    },
    { title: "roomid", dataIndex: "roomid", key: "roomid" },
    { title: "room", dataIndex: "room", key: "room" },
    { title: "fromdate", dataIndex: "fromdate", key: "fromdate" },
    { title: "todate", dataIndex: "todate", key: "todate" },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "booked" ? (
            <Tag color="green">CONFIRMED</Tag>
          ) : (
            <Tag color="red">CANCELLED</Tag>
          )}
        </>
      ),
    },
  ];

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.get("/api/hotels/gethotelbookings/"+JSON.parse(localStorage.getItem("currentUser"))._id)).data;
      setBookings(data);
      console.log(data)
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);
  return (
    <div className="row" style={{marginBottom : "9rem"}}>
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          <Table columns={columns} dataSource={bookings} />
        </div>
      )}
    </div>
  );
}

export default MerchantBooking;
