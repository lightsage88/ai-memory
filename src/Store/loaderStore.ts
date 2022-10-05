import create from "zustand";
//persist stores data in localstorage of browser
import { devtools, persist } from "zustand/middleware";

//set is used simply to change the state of any variable
const loaderStore = (set: any) => ({
  displayLoader: false,
  loaderMessage: '',
  //actions - manipulators
  showLoader: (message: string) => {
    set(() => ({
      displayLoader: true,
      loaderMessage: message
    }));
  },
  hideLoader:() => {
    set(() => ({
      displayLoader: false,
      loaderMessage: ''
    }));
  },
});

const useLoaderStore = create(loaderStore);

export default useLoaderStore;
