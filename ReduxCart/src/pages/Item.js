import React from "react";
import { useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";
function Item(props) {
  const dispatch = useDispatch();
  const handleRemove = (index) => {
    dispatch(remove(index));
  };
  return (
    <>
      <img src={props.data.product.image} alt=""></img>
      <h5>{props.data.product.title}</h5>
      <h5>{props.data.product.price}</h5>
      <button className="btn" onClick={() => handleRemove(props.index)}>
        Remove
      </button>
    </>
  );
}

export default Item;
