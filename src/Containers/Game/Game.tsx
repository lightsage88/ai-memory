import { useEffect, useState } from "react";
import Prompts from "../../Components/Prompts";
import usePromptStore from "../../Store/promptStore";
import useLoaderStore from "../../Store/loaderStore";
import useDeckStore from "../../Store/deckStore";
import Cardtable from "../Cardtable";
import Matchingtable from "../Matchingtable";
import axios from "axios";
import mockAPIResponse from "../../Mock/api-data/art-cards.json";

export const Game = () => {
  const [cardArtObjects, setCardArtObjects] = useState<any>(Array.of(8));
  const showLoader = useLoaderStore((state) => state.showLoader);
  const hideLoader = useLoaderStore((state) => state.hideLoader);
  const addCard = useDeckStore((state) => state.addCard);
  const shuffleDeck = useDeckStore((state => state.shuffleDeck));
  const memoryComplete = useDeckStore((state) => state.gameComplete);
  const prompts = usePromptStore((state) => state.prompts);

  const generateArtCards = async () => {
    showLoader(
      "This will take 5 to 8 minutes at least, go get a snack...you can't rush art, even when a computer is at the wheel."
    );
    // let response = await axios.post(`/api/ai-picture`, {prompts});
    let response = mockAPIResponse;
    setCardArtObjects(response.data);
    response.data.forEach(el => {
      addCard(el);
      addCard(el);
    });
    shuffleDeck();
  };
  useEffect(() => {
    if (prompts.length === 8) {
      generateArtCards();
    }
  }, prompts);
  useEffect(() => {
    if (cardArtObjects.length !== 0) {
      hideLoader();
    }
  }, cardArtObjects);
  return (
    <>
      {prompts.length !== 8 && <Prompts />}
      {prompts.length === 8 && !memoryComplete && <Cardtable cardArtObjects={cardArtObjects} />}
      {memoryComplete && <Matchingtable />}
    </>
  );
};

export default Game;
