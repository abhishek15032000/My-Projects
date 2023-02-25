import React, { useContext, useState } from 'react'
import { faker } from '@faker-js/faker';
import SingleProduct from './SingleProduct';
import { Cart } from '../Context';

faker.seed(100);
const Homepage = () => {
  
   
   const productsArray=[...Array(20)].map(()=>({
    id:faker.datatype.uuid(),
    name:faker.commerce.productName(),
    price:faker.commerce.price(),
    image:faker.image.image(),
   }))

    console.log(productsArray);
    const [products]=useState(productsArray);
  return (
    <div className='productContainer'>
        {
            products.map((element)=>{
               return( <SingleProduct prod={element} key={element.id}/>);
            })
        }
    </div>
  )
}

export default Homepage