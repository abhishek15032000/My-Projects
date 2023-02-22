import React, { useEffect, useState } from "react";
import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";
const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  // subscribing to state change
  useEffect(() => {
    dispatch(fetchProducts());
    //    const fetchProducts=async()=>{
    //         const response=await fetch('https://fakestoreapi.com/products');
    //         const data=await response.json();
    //         // console.log(data);
    //         setProducts(data);
    //    }
    //    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    // product
    dispatch(add({ product }));
  };
  // check the status before even rendering
  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong</h2>;
  }

  return (
    <div className="productsWrapper">
      {products.map((product) => {
        return (
          <div className="card" key={product.id}>
            <img src={product.image} alt=""></img>
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button className="btn" onClick={() => handleAdd(product)}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
