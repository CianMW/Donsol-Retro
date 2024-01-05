export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades' | 'Joker';
export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 21;
export type GameMode = 'Easy' | 'Normal' | 'Hard';


export interface Card {
    suit: Suit;
    value: Value;
    imageLink:string;
  }
