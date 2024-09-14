import React, { useState, useEffect } from 'react';
import { GameWrapper } from './GameWrapper';

interface PuzzleGameProps {
  onComplete: () => void;
}

export const PuzzleGame: React.FC<PuzzleGameProps> = ({ onComplete }) => {
  const [puzzle, setPuzzle] = useState<number[]>([]);
  const [selectedPieces, setSelectedPieces] = useState<number[]>([]);

  useEffect(() => {
    // Initialize puzzle
    setPuzzle(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  }, []);

  const handlePieceClick = (piece: number) => {
    if (selectedPieces.includes(piece)) {
      setSelectedPieces(selectedPieces.filter(p => p !== piece));
    } else if (selectedPieces.length < 3) {
      const newSelected = [...selectedPieces, piece];
      setSelectedPieces(newSelected);
      if (newSelected.length === 3 && sumFifteen(newSelected)) {
        onComplete();
      }
    } // Added missing closing bracket
  }; // Added missing closing bracket

  return (
    <GameWrapper title="Number Puzzle">
      <p className="mb-4">Select three numbers that sum to 15.</p>
      <div className="grid grid-cols-3 gap-2">
        {puzzle.map((piece) => (
          <button
            key={piece}
            onClick={() => handlePieceClick(piece)}
            className={`w-16 h-16 text-2xl font-bold rounded ${
              selectedPieces.includes(piece)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {piece}
          </button>
        ))}
      </div>
    </GameWrapper>
  );
};

function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Shuffle logic
  }
  return array; // Return shuffled array
}

function sumFifteen(newSelected: number[]): boolean {
  return newSelected.reduce((acc, curr) => acc + curr, 0) === 15; // Check if sum is 15
}