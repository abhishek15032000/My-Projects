import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Cart } from '../Context'

const Header = () => {
  const {cart}=useContext(Cart);
  return (
    <div>
        <span className='header'>React Context Api turtorial</span>
        <ul className='nav'>
              <li className='prod'>
                  <Link to='/' style={{color:"whitesmoke",textDecoration:"none"}}>Home Page</Link>
              </li>
              <li className='prod1'>
                 <Link to='/cart' style={{color:"whitesmoke",textDecoration:"none"}}>Cart{cart.length>0?`(${cart.length})`:""}</Link>
              </li>
        </ul>
    </div>
  )
}

export default Header