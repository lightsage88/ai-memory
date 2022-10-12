import { useEffect, useState } from "react";
import Prompts from "../../Components/Prompts";
import usePromptStore from "../../Store/promptStore";
import useLoaderStore from "../../Store/loaderStore";
import useDeckStore from "../../Store/deckStore";
import Cardtable from "../Cardtable";
import axios from "axios";
import mockAPIResponse from "../../Mock/api-data/art-cards.json";

export const Game = () => {
  const [cardArtObjects, setCardArtObjects] = useState<any>(Array.of(8));
  const showLoader = useLoaderStore((state) => state.showLoader);
  const hideLoader = useLoaderStore((state) => state.hideLoader);
  const addCard = useDeckStore((state) => state.addCard);
  const shuffleDeck = useDeckStore((state => state.shuffleDeck));
  const prompts = usePromptStore((state) => state.prompts);
  console.log("game running here are the prompts:", prompts);

  const generateArtCards = async () => {
    //set up zustand store for loaders and messages
    console.log("generateArtCardsrunning...");
    showLoader(
      "This will take 5 to 8 minutes at least, go get a snack...you can't rush art, even when a computer is at the wheel."
    );
    // let response = await axios.post(`/api/ai-picture`, {prompts});
    let response = mockAPIResponse;
    setCardArtObjects(response.data);
    response.data.forEach(el => {
      console.log('el', el);
      addCard(el);
      addCard(el);
    });
    shuffleDeck();
  };
  useEffect(() => {
    if (prompts.length === 8) {
      console.log("booyah");
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
      {prompts.length === 8 && <Cardtable cardArtObjects={cardArtObjects} />}
    </>
  );
};

export default Game;
