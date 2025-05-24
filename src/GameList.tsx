import React from 'react';

const GAMES = [
  { name: "Plinko", description: "Drop the ball and watch it bounce!" },
  { name: "Mines", description: "Uncover tiles, avoid the mines!" },
  { name: "Slots", description: "Spin the reels for a big win!" },
  { name: "Roulette", description: "Place your bets on the wheel!" },
  { name: "Blackjack", description: "Beat the dealer to 21!" },
];

export function GameList() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Choose Your Game</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES.map((game) => (
          <div
            key={game.name}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
            onClick={() => alert(`${game.name} is coming soon!`)}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">{game.name}</h3>
            <p className="text-gray-600 text-sm">{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
