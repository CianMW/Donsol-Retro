"use client"
import { Card, GameMode } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface GameData {
  deck: Card[];
  playerHealth: number;
  equippedShield: number | null;
  previousShieldValue: number | null;
  isPreviousRoomEscaped: boolean;
  gameMode: GameMode;
  updateGameData: (gameData: GameData) => void;
}

const defaultGameData: GameData = {
  deck: [], // You'll need to initialize this with a function
  playerHealth: 21,
  equippedShield: null,
  previousShieldValue: null,
  isPreviousRoomEscaped: false,
  gameMode: 'Easy', // Default game mode
  updateGameData: () => {}
};

function getLocalStorage(key: string, initialValue: any) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      console.error("Error reading from localStorage", e);
      return initialValue;
    }
  }

  function setLocalStorage(key: string, value: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }

export const GameContext = createContext<GameData>(defaultGameData);


export const GameProvider = ({ children }: any) => {
  const [gameData, setGameData] = useState<GameData>(defaultGameData);

  useEffect(() => {
    const savedGameData = getLocalStorage('gameData', defaultGameData);
    setGameData(savedGameData);
  }, []);

  const updateGameData = (newGameData: GameData) => {
    setGameData(newGameData);
    setLocalStorage('gameData', newGameData);
  };

  return (
    <GameContext.Provider value={{ ...gameData, updateGameData }}>
      {children}
    </GameContext.Provider>
  );
};

// To use this context in a component
export const useGame = () => useContext(GameContext);
