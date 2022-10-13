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
      cardDeck: cards,
    }));
  },
  clearDeck: () => {
    set((state: any) => ({
      cardDeck: [],
    }));
  },
  showCardViaDataCardIndex: (dataCardIndex: number) => {
    console.log("scvdci", dataCardIndex);
    set((state: any) => ({
      cardDeck: state.cardDeck.map((el: any) => {
        console.log("das el", el);
        if (el.dataId === dataCardIndex) {
          console.log("make a truey");
          return {
            ...el,
            shown: true,
          };
        } else {
          return el;
        }
      }),
    }));
  },
  hideUnsolvedCardsMatches: () => {
    set((state: any) => ({
      cardDeck: state.cardDeck.map((el: any) => {
        const twoShownUnsolvedInDeck = state.cardDeck.filter((el: any) => {
          if (!el.solved && el.shown) {
            return el;
          }
        }).length;
        if (twoShownUnsolvedInDeck >= 2) {
          console.log('TWO SHOWN UNSOLVED IN DECK');
          if (!el.solved) {
            return { ...el, shown: false };
          } else {
            return el;
          }
        } else {
          return el;
        }
      }),
    }));
  },
  setSolved: (dataCardIndex: number, cardPromptText: string) => {
    set((state: any) => ({
      cardDeck: state.cardDeck.map((el: any) => {
        //if its shown
        //if it has the same cardTextPrompt
        //then the card with the Index and the matching one get the 'solved' true attribute.
      })
    }))
  },
  shuffleDeck: () => {
    set((state: any) => ({
      cardDeck: state.cardDeck
        .sort(() => Math.random() - 0.5)
        .map((el: any, index: any) => {
          return {
            ...el,
            ...{
              dataId: index,
              shown: false,
              solved: false,
            },
          };
        }),
    }));
  },
});

const useDeckStore = create(deckStore);

export default useDeckStore;
