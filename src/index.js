import React, { Component } from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";

class Square extends Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => {this.props.onSquareClick()}}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends Component {
  handleClick(i) {
    if (calculateWinner(this.props.squares) || this.props.squares[i]) {
      return;
    }
    const nextSquares = this.props.squares.slice();
    if (this.props.xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    this.props.onPlay(nextSquares);
  }

  render() {
    const winner = calculateWinner(this.props.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={this.props.squares[0]} onSquareClick={() => this.handleClick(0)} />
          <Square value={this.props.squares[1]} onSquareClick={() => this.handleClick(1)} />
          <Square value={this.props.squares[2]} onSquareClick={() => this.handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={this.props.squares[3]} onSquareClick={() => this.handleClick(3)} />
          <Square value={this.props.squares[4]} onSquareClick={() => this.handleClick(4)} />
          <Square value={this.props.squares[5]} onSquareClick={() => this.handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={this.props.squares[6]} onSquareClick={() => this.handleClick(6)} />
          <Square value={this.props.squares[7]} onSquareClick={() => this.handleClick(7)} />
          <Square value={this.props.squares[8]} onSquareClick={() => this.handleClick(8)} />
        </div>
      </>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      currentMove: 0,
    };
  };

  handlePlay(nextSquares) {
    const { history, currentMove } = this.state;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    this.setState({
      history: nextHistory,
      currentMove: nextHistory.length - 1,
    });
  }

  jumpTo(nextMove) {
    this.setState({
      currentMove: nextMove,
    });
  }

  render() {
    const { history, currentMove } = this.state;
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {description}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={(nextSquares) => this.handlePlay(nextSquares)}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  };
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
