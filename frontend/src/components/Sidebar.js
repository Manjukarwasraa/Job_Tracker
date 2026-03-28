import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "200px", minHeight: "100vh" }}>
      <h5>Menu</h5>
      <ul className="list-unstyled">
        <li><Link className="text-white" to="/dashboard">Dashboard</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;