import { useState } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]        
  ];
  
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(sq => sq !== null);
  const gameActive = !winner && !isBoardFull;

  let statusMessage = '';
  if (winner) {
    statusMessage = `Winner: ${winner}`;  
  } else if (isBoardFull) {
    statusMessage = `Draw: Neither wins`;  
  } else {
    statusMessage = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  function handleSquareClick(index) {
    if (winner || isBoardFull || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="status-message" style={{ marginBottom: '20px', fontSize: '1.5rem', color: '#edd9b0' }}>
        {statusMessage}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 100px)', 
        gap: '10px',
        marginBottom: '20px'
      }}>
        {squares.map((value, idx) => (
          <button
            key={idx}
            className="square"
            onClick={() => handleSquareClick(idx)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              backgroundColor: '#3d5068',
              color: value === 'X' ? '#ffcba4' : '#b7e0ff',
              border: '2px solid #61738b',
              borderRadius: '10px',
              cursor: (winner || isBoardFull || value) ? 'default' : 'pointer',
              opacity: (winner || isBoardFull || value) ? 0.9 : 1
            }}
            disabled={winner || isBoardFull || value !== null}
          >
            {value}
          </button>
        ))}
      </div>
      <button 
        id="reset" 
        onClick={resetGame}
        style={{
          padding: '10px 30px',
          fontSize: '1.2rem',
          backgroundColor: '#dbbd8f',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: '#1f2833'
        }}
      >
        Reset Game
      </button>
    </div>
  );
}