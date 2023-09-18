import React, { useEffect, useState } from "react";
import Footer from "../../../../components/footer";
import Header from "../../../../components/header";

import * as Styled from "./styles";
import Homecard from "../../../../components/homeCard";
import { TCardProps } from "../../../../components/plansCards/card";

import { mainAdmCategories } from "./categories";
import { useNavigate } from "react-router-dom";
import isMobile from "is-mobile";
import { isAuth } from "../../../../utils/security/isCrypto";
import { TUser } from "../../../../service/module/login";

const RestaurantHome: React.FC = () => {
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
      setUser(usr);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const dividirArray = (array: any[], tamanho: number) => {
    let arrayDividido = [];
    for (let i = 0; i < array.length; i += tamanho) {
      let subarray = array.slice(i, i + tamanho);
      arrayDividido.push(subarray);
    }

    return arrayDividido.map((row: TCardProps[], index: number) => {
      return (
        <Styled.CardsContainer>
          {row.map((item: TCardProps) => {
            return (
              <div
                style={{
                  width: isMobile() ? "80%" : "50%",
                }}
                onClick={() => {
                  if (item.title === "Cardápio digital") {
                    navigate(`/cardapio/${isAuth().company.URL}`);
                  } else {
                    item.url && navigate(item.url);
                  }
                }}
              >
                <Homecard {...item} />
              </div>
            );
          })}
        </Styled.CardsContainer>
      );
    });
  };

  const optionsRows = dividirArray(mainAdmCategories, isMobile() ? 1 : 3);
  return (
    <>
      <Header />
      <Styled.MainContainer>
        <Styled.CategoryContainer>
          <Styled.ItemSpan> Bem vindo, {user?.name}.</Styled.ItemSpan>
          {optionsRows}
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default RestaurantHome;
