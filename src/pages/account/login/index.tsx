import React, { useState } from "react";
import * as Styled from "./styles";
import { useForm } from "react-hook-form";
import footerLogo from "../../../assets/logo/footerLogo.png";
import { message } from "antd";
import { login } from "../../../service/module/login";
import { encryptToAuth } from "../../../utils/security/isAuth";

export type TLogin = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [error, setError] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<TLogin>();
  const onSubmit = async (user: TLogin) => {
    if (user.email && user.password) {
      try {
        await login(user);
      } catch (error) {
        setError(true);
        message.error("Verifique os dados e tente novamente.");
      }
    } else {
      message.error("Preencha todos os campos!");
    }
  };

  return (
    <>
      <Styled.Cointainer>
        <Styled.FormCointainer onSubmit={handleSubmit(onSubmit)}>
          <Styled.LogoImg src={footerLogo} alt="" />
          <Styled.MainContainer>
            {error && (
              <span className="error-span">
                Verifique os dados e tente novamente!
              </span>
            )}
            <div className="span-input-container">
              <span className="span-input">E-mail</span>
              <Styled.Input {...register("email")} placeholder="E-mail" />
            </div>
            <div className="span-input-container">
              <span className="span-input">Senha</span>
              <Styled.Input
                type="password"
                {...register("password")}
                placeholder="Password"
              />
            </div>
            <Styled.BtnContainer>
              <Styled.Btn type="submit">Login</Styled.Btn>
            </Styled.BtnContainer>
            <a href="/a" className="span-forget">
              Esqueci a senha
            </a>
          </Styled.MainContainer>
        </Styled.FormCointainer>
      </Styled.Cointainer>
    </>
  );
};

export default Login;
