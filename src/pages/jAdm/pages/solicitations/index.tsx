import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import isMobile from "is-mobile";
import { isAuth } from "../../../../utils/security/isCrypto";
import { TUser } from "../../../../service/module/login";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import * as Styled from "./styles";

const JSolicitations: React.FC = () => {
  const [user, setUser] = useState<TUser>();
  const [solicitation, setSolicitation] = useState([]);

  useEffect(() => {
    const usr = isAuth(true);
    if (usr.userType === "admin-j") {
      setUser(usr);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Styled.MainContainer>
        <Styled.CategoryContainer>
          <Styled.Span>Solicitações</Styled.Span>
          <Styled.SolicitationsContainer>kkkkkkk</Styled.SolicitationsContainer>
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default JSolicitations;
