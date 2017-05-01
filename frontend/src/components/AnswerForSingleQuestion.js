import React, { Component } from 'react';


export default class AnswerForSingleQuestion extends Component {
    render() {
        const { questionText, questionId, addAnswer, currentSongName, answers } = this.props;
        const isAnswer = answers.hasOwnProperty(currentSongName) ? true : false
 
        return (
            <div>
                <h4>
                    <strong>{questionText}</strong>
                </h4>
                <div className="input-wrapper">
                    <input
                        type="radio"
                        id={`${questionId}-yes`}
                        name={questionId}
                        onChange={(e) => addAnswer(e)}
                        value={true} 
                        checked={isAnswer ? answers[currentSongName][questionId] === true : false} />
                    <label htmlFor={`${questionId}-yes`} onClick={(e) => addAnswer(e)}> Tak</label>
                </div>
                <div className="input-wrapper">
                   <input
                        type="radio"
                        id={`${questionId}-no`}
                        name={questionId}
                        onChange={(e) => addAnswer(e)}
                        value={false} 
                        checked={isAnswer ? answers[currentSongName][questionId] === false : false} />
                <label htmlFor={`${questionId}-no`} onClick={(e) => addAnswer(e)}> Nie</label>
                </div>
            </div>
        );
    }
}
