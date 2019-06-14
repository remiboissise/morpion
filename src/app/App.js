import React from 'react';
import Board from '../board/Board';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
      ],
      xIsNext: true,

    }
  }

  restartGame() {
    this.setState({
      squares: [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
      ],
      xIsNext: true
    })
  }

  handleClick(event) {
    let row = event.currentTarget.dataset.row;
    let column = event.currentTarget.dataset.column;
    const squares = this.state.squares;
    const squares_flat = squares.flat(2);
    if(this.winner(squares) || !squares_flat.includes(null) || squares[row][column] != null) { 
      return;
    }
    squares[row][column] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  winner(squares)
  {
    if(this.verifyDiag(squares)) 
    {
      return true;
    }

    if(this.verifyColumn(squares))
    {
      return true;
    }

    if(this.verifyLines(squares)) 
    {
      return true;
    }
  }

  verifyLines(squares) {
    var result = false;
    ((squares[0][0] && squares[0][0] === squares[0][1] && squares[0][0] === squares[0][2]) 
      || (squares[1][0] && squares[1][0] === squares[1][1] && squares[1][0] === squares[1][2]) 
      || (squares[2][0] && squares[2][0] === squares[2][1] && squares[2][0] === squares[2][2])) ?
        result = true : result = false;
        return result;
  }

  verifyColumn(squares) {
    var result = false;
    ((squares[0][0] && squares[0][0] === squares[1][0] && squares[0][0] === squares[2][0]) 
      || (squares[0][1] && squares[0][1] === squares[1][1] && squares[0][1] === squares[2][1]) 
      || (squares[0][2] && squares[0][2] === squares[1][2] && squares[0][2] === squares[2][2])) ? 
        result = true : result = false;
        return result;
  }

  verifyDiag(squares) {
    var result = false;
    ((squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) 
      || (squares[0][2] && squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0])) ? 
        result = true : result = false;
        return result;
  }

  render() {
    let status;
    const squares = this.state.squares;
    const squares_flat = squares.flat(2);
    const winner = this.winner(squares);
    (winner) ? status = "Et le gagnant est..." + (this.state.xIsNext ? "'O'" : "'X'") : status = "Vous pouvez le faire " + (this.state.xIsNext ? "'X'" : "'O'");
    (!squares_flat.includes(null)) ? status = "Match nul ! CLIQUEZ sur REJOUER" : status = status;

    return (
      <>
        <div className="game">
          <p className="title">Morpion</p>
          <p className="status">{status}</p>
          <div className="board">
            <Board squares={squares} onClick={(event) => this.handleClick(event)} />
          </div>
          <button type="button" className="restart" onClick={this.restartGame.bind(this)}>
            Rejouer
          </button>
        </div>
      </>
    );
  }
}