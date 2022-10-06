import { FC } from "react";
import { Card as MatCard } from "@mui/material";
import { ICard } from "../../Interfaces/Card";
import styled from "styled-components";

const StyledMaterialUICard = styled(MatCard)`
    width: fit-content;
`;

export const Card: FC<ICard> = (base64ArtString, key) => {
  console.log("shit", base64ArtString);
  const { artBase64String } = base64ArtString;
  const imgTag = artBase64String ? (
    <img src={`data:image/jpeg;base64, ${artBase64String}`} />
  ) : null;
  return (
    <>
      <StyledMaterialUICard>
        {imgTag}
      </StyledMaterialUICard>
    </>
  );
};
