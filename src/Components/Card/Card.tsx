import { FC, useState } from "react";
import useDeckStore from "../../Store/deckStore";
import { ICard } from "../../Interfaces/Card";
import * as Styled from '../../Component-Lib/Card/styled';
import StartPattern from "../../Assets/Images/starPattern.jpeg";

export const Card: FC<ICard> = (cardData) => {
  const cardDeck = useDeckStore((state) => state.cardDeck);
  const showCardViaDataCardIndex = useDeckStore(
    (state) => state.showCardViaDataCardIndex
  );
  const hideUnsolvedCardsMatches = useDeckStore(
    (state) => state.hideUnsolvedCardsMatches
  );
  const checkIfMemoryIsComplete = useDeckStore(
    (state) => state.checkIfMemoryIsComplete
  );
  const { imageUrl, image, cardPromptText, shown, solved, dataCardIndex } =
    cardData;
  // Use image URL if available, otherwise use base64
  const cardImage = imageUrl;
  const cardPattern = StartPattern;
  const isFlipped = shown || solved;
  const toggleCard = () => {
    if (!shown) {
      showCardViaDataCardIndex(cardData.dataCardIndex);
      setTimeout(() => {
        hideUnsolvedCardsMatches();
        checkIfMemoryIsComplete();
      }, 900);
    }
  };
  const frontImgTag = cardPattern ? (
    <Styled.StyledImageTag
      className="card-image-tag"
      src={cardPattern}
      data-testid={!isFlipped ? "cardback-image" : undefined}
    />
  ) : null;
  const backImgTag = cardImage ? (
    <Styled.StyledImageTag
      className="card-image-tag"
      src={cardImage}
      data-testid={isFlipped ? `${cardPromptText.toLowerCase()}-image` : undefined}
    />
  ) : null;
  return (
    <>
      <Styled.StyledCardWrapperDiv onClick={toggleCard}>
        <Styled.StyledFlipCard>
          <Styled.StyledFlipCardInner $flipped={isFlipped}>
            <Styled.StyledFlipCardFace>
              <Styled.StyledMaterialUICard>
                {frontImgTag}
              </Styled.StyledMaterialUICard>
            </Styled.StyledFlipCardFace>
            <Styled.StyledFlipCardBack>
              <Styled.StyledMaterialUICard>
                <Styled.StyledHiddenStrongText data-testid={cardPromptText.toLowerCase()}>
                  {cardPromptText}
                </Styled.StyledHiddenStrongText>
                {backImgTag}
              </Styled.StyledMaterialUICard>
            </Styled.StyledFlipCardBack>
          </Styled.StyledFlipCardInner>
        </Styled.StyledFlipCard>
      </Styled.StyledCardWrapperDiv>
    </>
  );
};

export default Card;
