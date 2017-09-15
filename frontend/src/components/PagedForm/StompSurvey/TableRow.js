import React, { Component } from 'react';

export class TableRow extends Component {
    state = {
        selected: 0,
    }

    addAnswer = (e) => {
        const { addStompAnswers, firstCell } = this.props;
        const selected = Number(e.target.textContent);
        this.setState({ selected });
        addStompAnswers(firstCell, selected);
    }

    getColor = (index) => {
        const { selected } = this.state;

    
        if (selected === index) {
            return {
                background: selected === index && '#607D8B',
                color: '#EBEBEB',
                cursor: 'pointer',
            }
        }
        return {
            cursor: 'pointer'
        }
    }

    render() {
        const { firstCell, index } = this.props;

        return (
            <tr key={firstCell}>
                <td>{`${index + 1}. ${firstCell}`}</td>
                <td>W ogóle</td>
                <td title="W ogóle nie lubisz" style={this.getColor(1)} onClick={e => this.addAnswer(e)}>1</td>
                <td title="Nie lubisz" style={this.getColor(2)} onClick={e => this.addAnswer(e)}>2</td>
                <td title="Raczej nie lubisz" style={this.getColor(3)} onClick={e => this.addAnswer(e)}>3</td>
                <td title="Nie wiesz" style={this.getColor(4)} onClick={e => this.addAnswer(e)}>4</td>
                <td title="Raczej lubisz" style={this.getColor(5)} onClick={e => this.addAnswer(e)}>5</td>
                <td title="Lubisz" style={this.getColor(6)} onClick={e => this.addAnswer(e)}>6</td>
                <td title="Zdecydowanie Lubisz" style={this.getColor(7)} onClick={e => this.addAnswer(e)}>7</td>
                <td>Całkowicie</td>
            </tr>
        );
    }
}
