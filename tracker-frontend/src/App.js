import './App.css';
import Main from './main/Main';
import About from './main/About';
import React, { createContext } from 'react';
import { useTranslation} from "react-i18next";
import i18n from "i18next";

import {  BrowserRouter,  NavLink, Routes,  Route} from "react-router-dom";

export const prjContext = createContext('');

function App() {
  useTranslation();

  return (

    <BrowserRouter>
    <prjContext.Provider value = '[Sherif]'>
      <nav>
        <NavLink className ="nav1" to="/">{i18n.t("HOME", {ns:"label"})}</NavLink>
        <NavLink className ="nav1 nav2" to="/about">{i18n.t("ABOUT", {ns:"label"})}</NavLink>
      </nav>
      <Routes>
        
          <Route path="" element={<Main />} />
          <Route path="/about" element={<About />} />
      </Routes>
      </prjContext.Provider>
    </BrowserRouter>
  );
}
export default App;
