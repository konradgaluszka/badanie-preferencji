import React, { Component } from 'react';


export default class AnswerForSingleQuestion extends Component {
    render() {
        const { questionText, questionId, addAnswer, currentSongIndex, answers } = this.props;
        const isAnswer = answers.hasOwnProperty(currentSongIndex) ? true : false
 
        return (
            <div>
                <h4>
                    <strong>{questionText}</strong>
                </h4>
                <input
                    type="radio"
                    name={questionId}
                    onChange={(e) => addAnswer(e)}
                    value={true} 
                    checked={isAnswer ? answers[currentSongIndex][questionId] === true : false} />
                <span> Tak</span>
                <br/>
                <input
                    type="radio"
                    name={questionId}
                    onChange={(e) => addAnswer(e)}
                    value={false} 
                    checked={isAnswer ? answers[currentSongIndex][questionId] === false : false}/>
                <span> Nie</span>
                <br/>
            </div>
        );
    }
}
