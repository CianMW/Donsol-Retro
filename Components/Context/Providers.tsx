"use client";
import React from "react";
import { GameProvider } from "./GameContext";



export default function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <GameProvider>
                {children}
        </GameProvider>
    )
}