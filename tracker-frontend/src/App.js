import './App.css';
import Main from './main/Main';
import About from './main/About';
import React, { createContext } from 'react';
import { useTranslation} from "react-i18next";
import i18n from './main/lang/i18n';
import Miscellaneous from './main/Miscellaneous';

import {  BrowserRouter,  NavLink, Routes,  Route} from "react-router-dom";

export const prjContext = createContext('');

function App() {
  useTranslation();

  return (

    <BrowserRouter>
    <prjContext.Provider value = '[Sherif]'>
      <nav>
        <NavLink className ="nav1" to="/">{i18n.t("app.Home", {ns:"label"})}</NavLink>
        <NavLink className ="nav1 nav2" to="/about">{i18n.t("app.About", {ns:"label"})}</NavLink>
        <NavLink className ="nav1 nav3" to="/misc">{i18n.t("app.Miscellaneous", {ns:"label"})}</NavLink>
      </nav>
      <Routes>
        
          <Route path="" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/misc" element={<Miscellaneous />} />
      </Routes>
      </prjContext.Provider>
    </BrowserRouter>
  );
}
export default App;
