import React from 'react';

import './App.css';
import ToDoListComp from './ToDoListComp';
import ApiComponent from './ApiComponent';
import Navbar from './authentication/components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './authentication/pages/Product';
import ProtectedRoute from './authentication/ProtectedRoute';
import UnAuthorize from './authentication/UnAuthorize';
import Home from './authentication/pages/Home';


function App() {
  return (
    <div className="App">
      <ToDoListComp/>
      {/* <ApiComponent/> */}
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<ProtectedRoute component={<Product />} />} />
          <Route path='unauthorize' element={<UnAuthorize />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
