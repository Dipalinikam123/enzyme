import React from 'react';

import './App.css';
import ToDoListComp from './ToDoListComp';
import ApiComponent from './ApiComponent';
import Navbar from './authentication/components/Navbar';


function App() {
  return (
    <div className="App">
      {/* <ToDoListComp/> */}
      {/* <ApiComponent/> */}
      <Navbar/>
    </div>
  );
}

export default App;
