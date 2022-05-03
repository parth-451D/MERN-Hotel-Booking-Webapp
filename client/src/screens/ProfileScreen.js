import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";

import MyBookingScreen from "./MyBookingScreen";
const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="pro"  style={{backgroundImage : "linear-gradient(to right, #ffffff, #dbdbdb)", height : "44rem"}}>

    <div className="ml-3 mt-3 prof">
      <Tabs defaultActiveKey="1" onChange={callback} style={{marginBottom:"14rem"}}>
        <TabPane tab="Profile" key="1">
          <div className="row">
            <div className="col-xs-12 ml-5 mb-5">
              <div className="bs prof" style={{backgroundColor:"white"}}>
                <p style={{ fontWeight : "700" , fontFamily : "cursive"}}>My Profile</p>
                <p>Name : {user.name}</p>
                <p>Email : {user.isAdmin === undefined ? user.m_email : user.email}</p>
              </div>
            </div>
          </div>
        </TabPane>
        {user.isAdmin === undefined ? <></> : !user.isAdmin ? <TabPane tab="Booking" key="2">
          <MyBookingScreen></MyBookingScreen>
        </TabPane> : <></>}
      </Tabs>
    </div>
                    </div>
  );
}

export default ProfileScreen;
