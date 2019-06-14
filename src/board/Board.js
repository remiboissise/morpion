import React from 'react';
import Square from '../square/Square';

export default class Board extends React.Component {

    createBoard = () => {
        let { squares, onClick } = this.props;
        let board = []
        for(let i = 0, j = squares.length; i < j; i++)
        {
            let square = [];
            for(let k = 0, l = squares[i].length; k < l; k++)
            {
                square.push(<Square value={squares[i][k]} key={i + k} row={i} column={k} onClick={onClick.bind(this)} />)
            }
            board.push(<div className='row'> {square} </div>)
        }
        return board;
    }

    render() {
        return (
            <div>
                {this.createBoard()}
            </div>
        )
    }
}