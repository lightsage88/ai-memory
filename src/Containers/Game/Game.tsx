import Prompts from "../../Components/Prompts";
import usePromptStore from "../../Store/promptStore";

export const Game = () => {
  const prompts = usePromptStore((state) => state.prompts);
  console.log("game running here are the prompts:", prompts);

  return (
    <>
      {prompts.length !== 8 && <Prompts />}
      <h1>Game</h1>
    </>
  );
};

export default Game;
