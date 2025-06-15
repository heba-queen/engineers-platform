import React from "react";
import customer from '../assets/img/Customer acquisition.png'
const SidebarImage = () => (
  <div className="col-md-4" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
    <img src={customer} style={{ width: "100%" }} alt="Customer Acquisition" />
  </div>
);

export default SidebarImage;
