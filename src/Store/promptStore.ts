import create from "zustand";
//persist stores data in localstorage of browser
import { devtools, persist } from "zustand/middleware";

//set is used simply to change the state of any variable
const promptStore = (set: any) => ({
  prompts: Array.of(8),
  //actions - manipulators
  addPrompt: (prompt: any) => {
    set((state: any) => ({
      prompts: [prompt, ...state.prompts],
    }));
  },
  addPromptArray: (promptArray: any) => {
    set((state: any) => ({
      prompts: promptArray,
    }));
  },
  removePrompt: (promptId: string | number) => {
    set((state: any) => ({
      prompts: state.prompts.filter((el: any) => el.id !== promptId),
    }));
  },
});

const usePromptStore = create(promptStore);

export default usePromptStore;
