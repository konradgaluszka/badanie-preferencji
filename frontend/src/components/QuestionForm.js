import React, { Component } from 'react';

import AnswerForSingleQuestion from './AnswerForSingleQuestion';


export class QuestionForm extends Component {
    render() {
        const { questions, addAnswer, answers, currentSongIndex } = this.props;
        
        return (
            <form>
                {
                    questions.map((question, i) => <AnswerForSingleQuestion
                        key={question.id}
                        questionText={`${i + 1} ${question.text}`}
                        addAnswer={addAnswer}
                        questionId={question.id}
                        answers={answers}
                        currentSongIndex={currentSongIndex}
                        checked={answers}
                    />)
                }
            </form>
        );
    }
}
