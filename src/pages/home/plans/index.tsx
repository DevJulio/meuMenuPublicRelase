import React, { useEffect, useState } from "react";
import * as Styled from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import BorderPage from "../../../components/borderPage";
import { theme } from "../../../theme/theme";
import Switch from "react-switch";
import Spacer from "../../../components/spacer";
import mensal from "../../../assets/icons/mensal.png";
import anual from "../../../assets/icons/anual.png";
import isMobile from "is-mobile";
import PlansCard from "../../../components/plansCards";

import primeiro from "../../../assets/icons/cardsIcons/plans/primeiro.gif";
import segundo from "../../../assets/icons/cardsIcons/plans/segundo.gif";
import terceiro from "../../../assets/icons/cardsIcons/plans/terceiro.png";
import ButtonSecondary from "../../../components/buttons/secondary";
import {
  liteDetails,
  proDetails,
  ultimateDetails,
} from "../../../utils/plansDetails";

const Plans: React.FC = () => {
  const [checked, setCheked] = useState(false);

  useEffect(() => {
    setCheked(true);
    setCheked(false);
  }, []);

  const plans = (
    <>
      <Styled.MainSpanContainer>
        <Styled.Span>E ai? pronto para começar?</Styled.Span>
        <Styled.SpacerContainer>
          {/* <Spacer customWidth="9.5vw" color={theme.colors.red.normal} /> */}
        </Styled.SpacerContainer>
        <Styled.SpanAux>
          Escolha o plano que mais se encaixe para seu estabelecimento e bolso!
        </Styled.SpanAux>
      </Styled.MainSpanContainer>
      <Styled.OffCointainer>
        <Styled.OffSpan> 20% off</Styled.OffSpan>

        <Styled.SwitchContainer>
          <Styled.SpanAux>Mensal</Styled.SpanAux>
          <Switch
            uncheckedIcon={
              <Styled.SwitchIconCointainer>
                <Styled.SwitchIcon alt="mensal" src={mensal} />
              </Styled.SwitchIconCointainer>
            }
            checkedIcon={
              <Styled.SwitchIconCointainer>
                <Styled.SwitchIcon
                  alt="anual"
                  src={anual}
                  style={{ paddingTop: "0.3vh" }}
                />
              </Styled.SwitchIconCointainer>
            }
            height={35}
            width={90}
            offColor={theme.colors.green.normal}
            onColor={theme.colors.green.normal}
            onChange={setCheked}
            checked={checked}
          />
          <Styled.SpanAux style={{ marginLeft: "0.5vw" }}>Anual</Styled.SpanAux>
        </Styled.SwitchContainer>

        <Styled.SwitchUnder>
          <Styled.SwitchUnderLeft
            style={{
              display: checked ? "none" : "flex",
            }}
          >
            <Spacer
              customHeight="5px"
              customWidth={isMobile() ? "19.8vw" : "3.8vw"}
              color={theme.colors.blue.palete}
            />
          </Styled.SwitchUnderLeft>

          <Styled.SwitchUnderRight
            style={{
              display: !checked ? "none" : "flex",
            }}
          >
            <Spacer
              customHeight="5px"
              customWidth={isMobile() ? "19.8vw" : "3.8vw"}
              color={theme.colors.blue.palete}
            />
          </Styled.SwitchUnderRight>
        </Styled.SwitchUnder>
      </Styled.OffCointainer>
      <Styled.PlansContainer>
        <PlansCard
          icon={primeiro}
          title={"Lite"}
          text={"Ideal para quem quer começar!"}
          mainColor={theme.colors.white.normal}
          auxColor={theme.colors.red.normal}
          textColor={theme.colors.yellow.palete}
          price={!checked ? 80.0 : 768.0}
          priceText={!checked ? "Por mês" : "por ano"}
          includeText={"Lite inclui:"}
          list={liteDetails}
        />
        <PlansCard
          icon={segundo}
          title={"Pro"}
          text={"Acesso a maioria das vantagens!"}
          mainColor={theme.colors.white.normal}
          auxColor={theme.colors.red.normal}
          textColor={theme.colors.yellow.palete}
          price={!checked ? 120.0 : 1152.0}
          priceText={!checked ? "Por mês" : "por ano"}
          includeText={"Tudo do lite, mais:"}
          list={proDetails}
        />
        <PlansCard
          icon={terceiro}
          title={"Ultimate"}
          text={"Recursos para os hard players!"}
          mainColor={theme.colors.blue.palete}
          auxColor={theme.colors.red.normal}
          textColor={theme.colors.yellow.palete}
          price={!checked ? 160.0 : 1536.0}
          priceText={!checked ? "Por mês" : "por ano"}
          includeText={"Tudo do pro, mais:"}
          isLast={true}
          list={ultimateDetails}
        />
      </Styled.PlansContainer>
      <Styled.BtnContainer>
        <ButtonSecondary
          Action={() => {}}
          Label="Ainda tem dúvidas sobre os planos? clique aqui e veja todos os detalhes!"
          color={theme.colors.red.normal}
          bgColor={theme.colors.white.normal}
        />
      </Styled.BtnContainer>
    </>
  );
  return (
    <>
      <BorderPage
        outsideColor={theme.colors.blue.palete}
        insideColor={theme.colors.yellow.palete}
        destop={<>{plans}</>}
        mobile={<>{plans} </>}
      />
    </>
  );
};
export default Plans;
