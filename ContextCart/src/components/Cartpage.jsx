import React, { useState,useEffect, useContext } from 'react'
import { Cart } from '../Context';
import SingleProduct from './SingleProduct'

const Cartpage = () => {
  const {cart}=useContext(Cart);
  const [total,setTotal]=useState();
  useEffect(() => {
     setTotal(cart.reduce((accumlator,currentPrice)=>accumlator+Number(currentPrice.price),0));
  }, [cart])
  

  return (
    <div>
      <span style={{fontSize:30}}>My Cart</span>
      <br />
      <span style={{fontSize:30}}>Total :Rs {total}</span>
      <div className='productContainer'>
          {
             cart.map((prod)=>{
               return(<SingleProduct key={prod.id} prod={prod}/>);
             })
          }
      </div>
    </div>
    
  )
}

export default Cartpage