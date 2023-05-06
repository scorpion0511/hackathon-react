import './App.css';
import Main from './main/Main';
import About from './main/About';
import React, { createContext } from 'react';

import {  BrowserRouter,  NavLink, Routes,  Route} from "react-router-dom";

export const prjContext = createContext('');

function App() {

  return (

    <BrowserRouter>
    <prjContext.Provider value = '[Sherif]'>
      <nav>
        <NavLink className ="nav1" to="/">Home</NavLink>
        <NavLink className ="nav1 nav2" to="/DALIA/love">About</NavLink>
      </nav>
      <Routes>
        
          <Route path="" element={<Main />} />
          <Route path="/dalia/love" element={<About />} />
      </Routes>
      </prjContext.Provider>
    </BrowserRouter>
  );
}
export default App;
