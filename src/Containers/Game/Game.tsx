import { useEffect, useState } from "react";
import Prompts from "../../Components/Prompts";
import usePromptStore from "../../Store/promptStore";
import useLoaderStore from "../../Store/loaderStore";
import Cardtable from "../Cardtable";
import axios from 'axios';

export const Game = () => {
  const [cardArt, setCardArt] = useState<any>(Array.of(8));
  const showLoader = useLoaderStore((state) => state.showLoader);
  const hideLoader = useLoaderStore((state) => state.hideLoader);
  const prompts = usePromptStore((state) => state.prompts);
  console.log("game running here are the prompts:", prompts);

  const generateArtCards = async() => {
    //set up zustand store for loaders and messages
    console.log('generateArtCardsrunning...');
    showLoader('This will take a few mintutes at least, go get a snack...you can\'t rush art.');
    let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ai-picture`, prompts);
    console.log('generateArtCards response', response);
    // setCardArt(response);
  }
  useEffect(() => {
    console.log('shiggy', prompts);
    if (prompts.length === 8) {
      console.log('booyah');
        generateArtCards();
    }
  }, prompts)
  useEffect(() => {
    if (cardArt.length !== 0) {
      hideLoader();
    }
  }, cardArt)
  return (
    <>
      {prompts.length !== 8 && <Prompts />}
      {prompts.length === 8 && <Cardtable />}
      <h1>Game</h1>
    </>
  );
};

export default Game;
