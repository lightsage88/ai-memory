import create from "zustand";
//persist stores data in localstorage of browser

//set is used simply to change the state of any variable
const deckStore = (set: any) => ({
  cardDeck: [],
  //actions - manipulators
  addCard: (card: any) => {
    set((state: any) => ({
      cardDeck: [card, ...state.cardDeck],
    }));
  },
  setDeck: (cards: any) => {
    set((state: any) => ({
      cardDeck: cards
    }));
  },
  clearDeck: () => {
    set((state: any) => ({
      cardDeck: [],
    }));
  },
  shuffleDeck: () => {
    set((state: any) => ({
      cardDeck: state.cardDeck.sort(() => Math.random() - 0.5)
    }))
  }
});

const useDeckStore = create(deckStore);

export default useDeckStore;
