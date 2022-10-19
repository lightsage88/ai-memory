import { useEffect, useState } from "react";
import Prompts from "../../Components/Prompts";
import usePromptStore from "../../Store/promptStore";
import useLoaderStore from "../../Store/loaderStore";
import useDeckStore from "../../Store/deckStore";
import Cardtable from "../Cardtable";
import Matchingtable from "../Matchingtable";
import mockAPIResponse from "../../Mock/api-data/art-cards.json";

export const Game = () => {
  const useMockData = process.env.REACT_APP_USE_DEV_MODE;
  const [cardArtObjects, setCardArtObjects] = useState<any>(Array.of(8));
  const { addCard, shuffleDeck, gameComplete } = useDeckStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const { prompts } = usePromptStore();

  const apiEndpoint = process.env.REACT_APP_DEV_MODE === 'false' ? 'https://ai-memory-api.onrender.com' : 'http://localhost:8080';
  console.log('the apiEndpoint we are using right now: ', apiEndpoint);
  const makeAIPost = async (prompts: any) => {
    try {
      const response = await fetch(`${apiEndpoint}/api/ai-picture`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompts }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  const generateArtCards = async () => {
    showLoader(
      "This will take 5 to 8 minutes at least, go get a snack...you can't rush art, even when a computer is at the wheel."
    );
    let response =
      useMockData === "true" ? mockAPIResponse.data : await makeAIPost(prompts);
    setCardArtObjects(response);
    Array.from(response).forEach((el: any) => {
      addCard(el);
      addCard(el);
    });
    shuffleDeck();
  };
  useEffect(() => {
    if (prompts.length === 8) {
      generateArtCards();
    }
  }, [prompts]);
  useEffect(() => {
    if (cardArtObjects.length !== 0) {
      // setTimeout(() => {
      hideLoader();
      // }, 5000);
    }
  }, [cardArtObjects]);
  return (
    <>
      {prompts.length !== 8 && <Prompts />}
      {prompts.length === 8 && !gameComplete && <Cardtable />}
      {gameComplete && <Matchingtable cardArtsObjects={cardArtObjects}/>}
    </>
  );
};

export default Game;
