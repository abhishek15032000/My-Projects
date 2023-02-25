
import React, { useContext } from 'react'
import { Cart } from '../Context'

const SingleProduct = ({prod}) => {
  const {cart,setCart}=useContext(Cart)
  return (
    <div className='products'>
          <img src={prod.image} alt={prod.name}></img>
          <div className='productDesc'>
              <span style={{fontWeight:700}}>{prod.name}</span>
              <span> &#x20b9; {prod.price.substring(0,3)}</span>
          </div>
          {
             cart.includes(prod)?
               <button onClick={()=>setCart(cart.filter((element)=>element.id!==prod.id))}>Remove from cart</button>
             : <button onClick={()=>setCart([...cart,prod])}>Add to Cart</button>
          }
    </div>
  )
}

export default SingleProduct