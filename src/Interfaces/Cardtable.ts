export interface ICardtable {
    cardArtObjects: CardtableObjects[]
}

export interface CardtableObjects {
    prompt: string,
    id: number,
    artBase64: string
}