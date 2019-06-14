import React from 'react';
import Board from '../board/Board';
import ReactGA from 'react-ga';
import configuration from '../config/configuration';

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

    componentDidMount() {
        ReactGA.initialize(configuration.googleAnalyticsTrackingId);
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    restartGame() {
        ReactGA.event({
            category: 'Game',
            action: 'Replay'
        });

        this.setState({
        squares: [
            [null, null, null], 
            [null, null, null], 
            [null, null, null]
        ],
        xIsNext: true
        });
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
        (winner) ? status = (this.state.xIsNext ? "'O'" : "'X'") + " est le gagnant de cette partie !" : status = "Vous pouvez le faire " + (this.state.xIsNext ? "'X'" : "'O'");
        if(!squares_flat.includes(null) && !winner) { status = "Match nul ! CLIQUEZ sur REJOUER"; }

        return (
            <div className="game">
                <p className="title">Morpion</p>
                <p className="status">{status}</p>
                <div className="board">
                    <Board squares={squares} onClick={(event) => this.handleClick(event)} />
                </div>
                <div className="restart">
                    <button type="button" onClick={this.restartGame.bind(this)}>
                        Rejouer
                    </button>
                </div>
            </div>
        );
    }
}