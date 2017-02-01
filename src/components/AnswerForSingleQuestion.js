import React from 'react';

export default function AnswerForSingleQuestion(props) {
    return (
        <div>
            <h4><strong>{props.question}</strong></h4>
            <input type="radio" name={props.questionId + '-yes'}
                   value={true}
                   checked={props.isYesChecked}
                   onChange={props.answerChanged} /> Tak
            <br/>
            <input type="radio" name={props.questionId + '-no'}
                   value={false}
                   checked={props.isNoChecked}
                   onChange={props.answerChanged} /> Nie
            <br/>
            <br/>
        </div>
    );
}