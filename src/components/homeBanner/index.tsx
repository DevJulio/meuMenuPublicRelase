import React from "react";
import { formatData } from "../../utils/parseDate";
import * as Styled from "./styles";

export interface ICategory {
  bannerDateColor: string;
  bannerImg: string;
  infoSpanColor: string;
  infoSpan: string;
}

const HomeBanner: React.FC<ICategory> = ({
  bannerDateColor,
  bannerImg,
  infoSpanColor,
  infoSpan,
}) => {
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");

  return (
    <>
      <Styled.BannerCarousel>
        <Styled.BannerDate
          style={{
            color: bannerDateColor,
          }}
        >
          <Styled.DateSpan>
            {new Date().getDate().toString().padStart(2, "0")}/{month}
          </Styled.DateSpan>
          <Styled.DateSpan>{formatData()}</Styled.DateSpan>
          <Styled.DateSpan
            style={{
              fontSize: "12px",
              color: "black",
            }}
          >
            clique e saiba mais
          </Styled.DateSpan>
        </Styled.BannerDate>
        <Styled.BannerInfo>
          <Styled.BannerImg src={bannerImg} />
          <Styled.InfoSpan
            style={{
              color: infoSpanColor,
            }}
          >
            {infoSpan}
          </Styled.InfoSpan>
        </Styled.BannerInfo>
      </Styled.BannerCarousel>
    </>
  );
};

export default HomeBanner;
