import styled from 'styled-components';
import { Card  } from "@mui/material";

export const StyledMaterialUICard = styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCardWrapperDiv = styled.div`
  width: 256px;
  height: 256px;
  min-width: 256px;
`;

export const StyledFlipCard = styled.div`
  background-color: transparent;
  width: 256px;
  height: 256px;
  perspective: 1000px;
`;

export const StyledFlipCardInner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "none")};
`;

export const StyledFlipCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

export const StyledFlipCardBack = styled(StyledFlipCardFace)`
  transform: rotateY(180deg);
`;

export const StyledImageTag = styled.img`
  width: 100%;
  height: 100%;
`;

export const StyledHiddenStrongText = styled.strong`
  position: absolute;
  visibility: hidden;
`;
