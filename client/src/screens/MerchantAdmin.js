import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import MerchantBooking from "./MerchantBooking";
import MerchantRooms from "./MerchantRooms";
import MerchantAddRoom from "./MerchantAddRoom";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function MerchantScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user || user.isAdmin == false) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="ml-3 mt-3 mr-3 bs">
      {console.log("mer")}
      <h1 className="text-center">Merchant Panel</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Bookings" key="1">
          <MerchantBooking />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <MerchantRooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <MerchantAddRoom />
        </TabPane>
        {/* <TabPane tab="Users" key="4">
          <AdminUserScreen></AdminUserScreen>
        </TabPane> */}
      </Tabs>
    </div>
  );
}

export default MerchantScreen;
