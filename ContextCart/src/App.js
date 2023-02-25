
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import './styles/app.scss';
import Header from './components/Header';
import Cartpage from './components/Cartpage';
import Homepage from './components/Homepage';
import { useState } from 'react';
function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<Homepage />}>
              </Route>
              <Route path="/cart" element={<Cartpage/>}>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
