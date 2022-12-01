import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Vantage from "./vantage";
import Welcome from "./welcome";
import Plans from "../plans";
import Curious from "./curious";

//import * as Styled from "./styles";
//planos e contato
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Welcome />
      <Plans />
      <Vantage />
      <Curious />
      <Footer />
    </>
  );
};

export default Home;
