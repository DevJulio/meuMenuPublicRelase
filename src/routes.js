import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import RestaurantHome from "./pages/adm/adm/home";
import AdmMenu from "./pages/adm/admMenu";
import CreateFood from "./pages/adm/createFood";
import SolicitationMeuMenu from "./pages/adm/createForm";
import MenuMeuMenu from "./pages/adm/createMenu";
import OffersMenu from "./pages/adm/keepOffers";
import UpdateFood from "./pages/adm/updateFood";
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
        <Route path="/cadastro-item-cardapio" element={<CreateFood />} />
        {/* ADM */}
        <Route path="/home" element={<RestaurantHome />} />
        <Route path="/adm/cardapio" element={<AdmMenu />} />
        <Route path="/adm/ofertas" element={<OffersMenu />} />
        <Route path="/adm/destaques" element={<></>} />
        <Route path="/adm/atualizar" element={<></>} />
        <Route path="/adm/comanda" element={<></>} />
        <Route path="/adm/suporte" element={<></>} />
        {/* UPDATE */}
        <Route path="/adm/update/cardapio" element={<UpdateFood />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesList;
