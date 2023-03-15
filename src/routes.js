import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import SolicitationMeuMenu from "./pages/adm/createForm";
import MenuMeuMenu from "./pages/adm/createMenu";
import Contact from "./pages/contact";

import Home from "./pages/home";
import Menu from "./pages/menu";
import Plans from "./pages/plans";
import PreMenu from "./pages/preMenu";

function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/planos" element={<Plans />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/cardapios" element={<PreMenu />} />
        <Route path="/cadastro" element={<SolicitationMeuMenu />} />
        <Route path="/cadastro-cardapio" element={<MenuMeuMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesList;
