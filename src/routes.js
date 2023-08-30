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
import OffersMenuPrice from "./pages/adm/keepOffersPrice";
import OffersMenuCombo from "./pages/adm/keepOffersCombo";
import OffersMenuAuto from "./pages/adm/keepOffersAuto";
import OffersMyOffers from "./pages/adm/keepOffersMyOffers";
import OffersEditCombo from "./pages/adm/keepOffersEditCombo";
import Destaques from "./pages/adm/destaques";
import UpdateData from "./pages/adm/updateData";
import ContactAdm from "./pages/adm/adm/contact";
import Comanda from "./pages/adm/adm/comanda";
import Login from "./pages/account/login";
import Staff from "./pages/adm/adm/staff";
import StaffHome from "./pages/adm/staff";
import JHome from "./pages/jAdm";
import JSolicitations from "./pages/jAdm/pages/solicitations";
import JCategories from "./pages/jAdm/pages/categories";
import JCategoriesSolicitations from "./pages/jAdm/pages/categories/solicitations";

function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/planos" element={<Plans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/cardapio/:empresa" element={<Menu />} />
        <Route path="/cardapios" element={<PreMenu />} />
        <Route path="/cadastro" element={<SolicitationMeuMenu />} />
        <Route path="/cadastro-cardapio" element={<MenuMeuMenu />} />
        <Route path="/cadastro-item-cardapio" element={<CreateFood />} />
        {/* STAFF */}
        <Route path="/staff/home" element={<StaffHome />} />
        {/* ADM */}
        <Route path="/adm/home" element={<RestaurantHome />} />
        <Route path="/adm/cardapio" element={<AdmMenu />} />
        <Route path="/adm/ofertas" element={<OffersMenu />} />
        <Route path="/adm/ofertas/preco" element={<OffersMenuPrice />} />
        <Route path="/adm/ofertas/combo" element={<OffersMenuCombo />} />
        <Route path="/adm/ofertas/automacao" element={<OffersMenuAuto />} />
        <Route
          path="/adm/ofertas/minhas-ofertas"
          element={<OffersMyOffers />}
        />
        <Route
          path="/adm/ofertas/minhas-ofertas/edicao"
          element={<OffersEditCombo />}
        />
        <Route path="/adm/destaques" element={<Destaques />} />
        <Route path="/adm/atualizar" element={<UpdateData />} />
        <Route path="/adm/suporte" element={<ContactAdm />} />
        <Route path="/adm/comanda" element={<Comanda />} />
        <Route path="/adm/time" element={<Staff />} />
        {/* UPDATE */}
        <Route path="/adm/update/cardapio" element={<UpdateFood />} />
        {/* J-ADM */}
        <Route path="/j/adm/home" element={<JHome />} />
        <Route path="/j/adm/solicitations" element={<JSolicitations />} />
        <Route path="/j/adm/categories" element={<JCategories />} />
        <Route
          path="/j/adm/categories/solicitations"
          element={<JCategoriesSolicitations />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesList;
