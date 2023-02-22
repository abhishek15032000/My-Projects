import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const navStyle = {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  };
  const items = useSelector((state) => state.cart);
  return (
    <div style={navStyle}>
      <span className="logo">Store</span>
      <div>
        <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/cart">
          Cart
        </Link>
        <span className="cartCount">Cart items :{items.length}</span>
      </div>
    </div>
  );
}

export default Navbar;
