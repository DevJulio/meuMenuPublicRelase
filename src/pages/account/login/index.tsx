import React, { useState } from "react";
import * as Styled from "./styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import footerLogo from "../../../assets/logo/footerLogo.png";

type TInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [error, setError] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<TInputs>();
  const navigate = useNavigate();

  const onSubmit = async (user: TInputs) => {
    try {
      //const response = await api.post("/admin/loginAdmin/", user);
      //const token = { ...response.data.data };
      // setCookie("user", JSON.stringify(token), 30);
      const profile = {
        userType: "a",
      };

      if (profile.userType === "a") {
        navigate("/adm/home");
      } else {
        navigate("/users");
      }
    } catch (error) {
      setError(true);
      alert("check Email or Password and try again");
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
