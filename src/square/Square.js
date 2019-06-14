import React from 'react'

export default class Square extends React.Component {
    render() {
        let { onClick, value, row, column } = this.props;
        return (
            <button className="square" onClick={onClick} data-row={row} data-column={column}>
                {value}
            </button>
        )
    }
}