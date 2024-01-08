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
  gameData.gameStatus = true;
  gameData.currentRoom = firstRoom;
  gameData.updateGameData(gameData);

  return gameData
}