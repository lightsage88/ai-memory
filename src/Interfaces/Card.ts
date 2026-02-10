export interface ICard {
    imageUrl?: string;
    image?: string;
    key: number;
    dataCardIndex: number;
    cardPromptText: string;
    shown: boolean;
    solved: boolean;
}