import { useEffect, useState } from "react";
import pLimit from "p-limit";
import Prompts from "../../Components/Prompts";
import usePromptStore from "../../Store/promptStore";
import useLoaderStore from "../../Store/loaderStore";
import useDeckStore from "../../Store/deckStore";
import Cardtable from "../Cardtable";
import Matchingtable from "../Matchingtable";
import mockAPIResponse from "../../Mock/api-data/art-cards.json";
import axios from "axios";

export const Game = () => {
  const limit = pLimit(2);
  const useMockData = process.env.REACT_APP_USE_MOCK_DATA;
  const [cardArtObjects, setCardArtObjects] = useState<any>(Array.of(8));
  const { addCard, shuffleDeck, gameComplete } = useDeckStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const { prompts } = usePromptStore();
  const apiEndpoint =
    process.env.REACT_APP_DEV_MODE === "false"
      ? "https://ai-memory-api.onrender.com"
      : "http://localhost:8080";

  const makeAIPost = async (prompts: any) => {
    const promptTextArray = prompts.map((el: any) => el.prompt);

    const promisedResult = await Promise.all(
      promptTextArray.map((el: any) => {
        return limit(() => axios.post(`${apiEndpoint}/api/ai-picture-single`, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: { prompt: el },
        }));
      })
    )
      .then((response: any) => {
        return response.map((el: any, index: number) => {
          return {...el.data, id: index}
        })
      })
      .catch((err) => {
        console.error(err);
      });
      return promisedResult;
  };

  const generateArtCards = async () => {
    showLoader(
      "This may take about 3-4 minutes. Go get a snack...you can't rush art, even when a computer is at the wheel."
    );
    let response =
      useMockData === "true" ? mockAPIResponse.data : await makeAIPost(prompts);
    if (response) {
      setCardArtObjects(response);

      Array.from(response).forEach((el: any) => {
        addCard(el);
        addCard(el);
      });
      shuffleDeck();
    }
  };
  useEffect(() => {
    if (prompts.length === 4) {
      generateArtCards();
    }
  }, [prompts]);
  useEffect(() => {
    if (cardArtObjects.length !== 0) {
      hideLoader();
    }
  }, [cardArtObjects]);
  return (
    <>
      {prompts.length !== 4 && <Prompts />}
      {prompts.length === 4 && !gameComplete && <Cardtable />}
      {gameComplete && <Matchingtable cardArtsObjects={cardArtObjects} />}
    </>
  );
};

export default Game;
