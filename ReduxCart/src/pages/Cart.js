import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
const Cart = () => {
  const products = useSelector((state) => state.cart);

  return (
    <div>
      <h3>Cart</h3>
      <div className="cartWrapper">
        {products.map((product, index) => (
          <div className="cartCard">
            <Item data={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
