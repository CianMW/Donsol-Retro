import { Card, GameData, GameMode, Suit } from "@/types";

// Idea here is to create a suite of pure functions 

// creates and returns a deck of cards
export function createDeck(): Card[] {
    const deck: Card[] = [];
    const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    for (const suit of suits) {
      for (let value = 1; value <= 13; value++) {
        deck.push({ suit, value, imageUrl:`/cards/${suit}/${suit}_card_${value.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}.png` });
      }
    }
    deck.push({ suit: 'Joker', value: 21, imageUrl:'/cards/joker.png' });
    deck.push({ suit: 'Joker', value: 21, imageUrl:'/cards/joker.png' });
    return deck;
  }


  // accepts an array of cards and returns the deck
  export function shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
  
// TBC may need updating for check in context if hard mode is active
  export function drawRoom(deck: Card[]): {room:Card[], remainingDeck:Card[]} {
    const room = deck.slice(0, 4);
    const remainingDeck = deck.slice(4);
    return {room, remainingDeck};
  }

export function initialiseGame(gameData:GameData):GameData{
  const {room:firstRoom, remainingDeck} = drawRoom(shuffleDeck(createDeck()))
  gameData.deck = remainingDeck;
  gameData.playerHealth = 21;
  gameData.equippedShield = null;
  gameData.previousShieldValue = null;
  gameData.isPreviousRoomEscaped = false;
  gameData.gameStatus = 'play';
  gameData.currentRoom = firstRoom;
  gameData.potionUsedPreviously =false;
  gameData.updateGameData(gameData);

  return gameData
}


// Function to handle potion cards (Hearts)
export function handlePotion(potionUsedPreviously:boolean,card: Card, playerHealth: number): Partial<GameData> {
  if (!potionUsedPreviously) {
    return{
      playerHealth: Math.min(playerHealth + getCardValue(card), 21),
      potionUsedPreviously:true
    }
  }
  return {playerHealth:playerHealth};
}


// Gets the value of the card
export function getCardValue(card: Card, isMonster: boolean = false): number {
  if (card.suit === 'Joker') {
    return 21;
  }
  interface faceCardObject {
   [key:string]:number
  }
  const faceCardValues:faceCardObject = isMonster ? { '11': 11, '12': 13, '13': 15, '1': 17 } : { '11': 11, '12': 11, '13': 11, '1': 11 };
  return card.value > 10 || card.value === 1 ? faceCardValues[`${card.value}`] : card.value;
}


export function handleMonster(card: Card, playerHealth: number, equippedShield: number | null): Partial<GameData> {
  const monsterValue = getCardValue(card, true);
  const damage = equippedShield !== null ? Math.max(monsterValue - equippedShield, 0) : monsterValue;
  return {playerHealth:Math.max(playerHealth - damage,0)};
}


// Function to handle shield cards (Diamonds)
export function handleShield(card: Card, equippedShield: number | null, previousShieldValue: number | null): Partial<GameData> {
  const shieldValue = getCardValue(card);
  if (previousShieldValue !== null && shieldValue >= previousShieldValue) {
    // Shield breaks, player is unarmored
    return {equippedShield:null,
    previousShieldValue:null}
  }
  // Update the previous shield value for next shield card encounter
  return{
    previousShieldValue: shieldValue,
    equippedShield:shieldValue
  }

}