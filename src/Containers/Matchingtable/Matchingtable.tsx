import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DndContext } from "@dnd-kit/core";
import DraggableText from "../../Components/DraggableText";
import DroppableImage from "../../Components/DroppableImage";

export const Matchingtable = (cardArtsObjects: any) => {
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [parent, setParent] = useState(null);
  const [matchCount, setMatchCount] = useState<number>(0);
  const [imageSources, setImageSources] = useState(
    cardArtsObjects.cardArtsObjects
  );
  const draggableTextInstance = <DraggableText>drag me</DraggableText>;
  let draggableTextInstances = imageSources
    .sort(() => Math.random() - 0.5)
    .map((el: any, index: number) => {
      return (
        <DraggableText imageSourceData={el} key={index}>
          {el.prompt}
        </DraggableText>
      );
    });


  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === event.active.id) {
      setMatchCount(matchCount + 1);
      setImageSources(
        imageSources.filter((el: any) => el.prompt !== event.over.id)
      );
    }
  };

  const StyledImage = styled.img`
    width: 20vw;
    height: 20vw;
  `;

  const droppableImages = imageSources
    .sort(() => Math.random() - 0.5)
    .map((el: any, index: number) => {
      return (
        <DroppableImage>
          <StyledImage
            data-imageSourceData={el}
            src={`data:image/jpeg;base64, ${el.artBase64}`}
          />
        </DroppableImage>
      );
    });
  const StyledImageDiv = styled.div`
    display: grid;
  `;
  return (
    <div data-testid="matching-table-div">
      {matchCount < 8 && (
        <>
          <h3>You did well to match the pairs of cards!</h3>
          <h5>Now can you drag the prompts to the correct picture?</h5>
          <DndContext onDragEnd={handleDragEnd}>
            <div>{draggableTextInstances}</div>
            <StyledImageDiv>{droppableImages}</StyledImageDiv>
          </DndContext>
        </>
      )}
      {matchCount >= 8 && (
        <>
          <h1>Thanks for playing!</h1>
        </>
      )}
    </div>
  );
};

export default Matchingtable;
