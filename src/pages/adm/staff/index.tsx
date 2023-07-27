import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

const StaffHome: React.FC = () => {

  const [render, setRender] = useState<boolean>(false);
  
  useEffect(() => {}, []);

  return (
    <>
      <Header />

      <Footer />
    </>
  );
};

export default StaffHome;
