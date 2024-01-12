export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades' | 'Joker';
export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 21;
export type GameMode = 'Easy' | 'Normal' | 'Hard';



export interface Card {
    suit: Suit;
    value: number;
    imageUrl:string;
  }


  export interface GameData {
    deck: Card[];
    currentRoom:Array<Card|null>;
    playerHealth: number;
    equippedShield: number | null;
    previousShieldValue: number | null;
    isPreviousRoomEscaped: boolean;
    gameMode: GameMode;
    updateGameData: (gameData: Partial<GameData>) => void;
    gameStatus:'menu'|'play'|'win'|'lose';
    potionUsedPreviously:boolean;
  }