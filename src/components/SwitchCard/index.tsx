import React from "react";
import * as Styled from "./styles";
import ReactSwitch from "react-switch";
import { theme } from "../../theme/theme";
interface Props {
  handleSwitchChange: Function;
  updateFunc: Function;
  id: string;
  value: boolean;
}
const SwitchCard: React.FC<Props> = ({
  handleSwitchChange,
  id,
  value,
  updateFunc,
}) => {
  return (
    <>
      <Styled.SwitchContainerRow>
        <Styled.SwitchContainer>
          <Styled.SwitchSpan style={{ color: theme.colors.yellow.palete }}>
            Disponibilidade:
          </Styled.SwitchSpan>
          <ReactSwitch
            id={id}
            height={35}
            width={90}
            offColor={theme.colors.red.normal}
            onColor={theme.colors.green.normal}
            onChange={() => {
              handleSwitchChange(id);
            }}
            checked={value}
          />
          {value ? (
            <Styled.SwitchSpan>Ativo</Styled.SwitchSpan>
          ) : (
            <Styled.SwitchSpan>Desativado </Styled.SwitchSpan>
          )}
        </Styled.SwitchContainer>
        <Styled.SwitchBtnContainer>
          <Styled.SwitchSpan
            style={{
              color: theme.colors.red.normal,
              fontSize: theme.fontSize.md2,
            }}
            onClick={() => {
              updateFunc();
            }}
          >
            Editar
          </Styled.SwitchSpan>
        </Styled.SwitchBtnContainer>
      </Styled.SwitchContainerRow>
    </>
  );
};

export default SwitchCard;
