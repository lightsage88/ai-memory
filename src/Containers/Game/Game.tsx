import { useEffect, useState } from "react";
import Prompts from "../../Components/Prompts";
import usePromptStore from "../../Store/promptStore";
import useLoaderStore from "../../Store/loaderStore";
import useDeckStore from "../../Store/deckStore";
import Cardtable from "../Cardtable";
import Matchingtable from "../Matchingtable";
import mockAPIResponse from "../../Mock/api-data/art-cards.json";
import axios from "axios";

export const Game = () => {
  const useMockData = process.env.REACT_APP_USE_MOCK_DATA;
  const [cardArtObjects, setCardArtObjects] = useState<any>(Array.of(8));
  const { addCard, shuffleDeck, gameComplete } = useDeckStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const { prompts } = usePromptStore();
  console.log("GAME process.env", process.env);
  const apiEndpoint =
    process.env.REACT_APP_DEV_MODE === "false"
      ? "https://ai-memory-api.onrender.com"
      : "http://localhost:8080";
  console.log("the apiEndpoint we are using right now: ", apiEndpoint);
  // const makeAIPost = async (prompts: any) => {
  //   try {
  //     const response = await fetch(`${apiEndpoint}/api/ai-picture`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompts }),
  //     });
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  //   const [resp1, setResp1] = useState();
  // const [resp2, setResp2] = useState();

  // useEffect(() => {
  //     Promise.all([
  //         fetch('/api/...'),
  //         fetch('/api/...')
  //     ]).then(links => {
  //         const response1 = links[0];
  //         const response2 = links[1];

  //         setResp1(response1);
  //         setResp2(response2);
  //     })
  // }, [/*dependency array*/])

  const makeAIPost = async (prompts: any) => {
    console.log("makeAIPost running with these prompts:", prompts);
    const promptTextArray = prompts.map((el: any) => el.prompt);

    const promisedResult = await Promise.all(
      promptTextArray.map((el: any) => {
        return axios.post(`${apiEndpoint}/api/ai-picture-single`, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: { prompt: el },
        });
       
      })
    )
      .then((response: any) => {
        console.log("first thing", response);
        return response.map((el: any, index: number) => {
          return {...el.data, id: index}
        })
      })
      .catch((err) => {
        console.error(err);
      });
      console.log('promisedResult', promisedResult);
      return promisedResult;
  };

  const generateArtCards = async () => {
    showLoader(
      "This will take 5 to 8 minutes at least, go get a snack...you can't rush art, even when a computer is at the wheel."
    );
    let response =
      useMockData === "true" ? mockAPIResponse.data : await makeAIPost(prompts);
      console.log('response is: ', response);
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
      {gameComplete && <Matchingtable cardArtsObjects={cardArtObjects} />}
    </>
  );
};

export default Game;
