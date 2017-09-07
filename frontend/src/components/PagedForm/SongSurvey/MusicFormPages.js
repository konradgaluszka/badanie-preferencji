import React from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

import { QuestionForm } from './QuestionForm';
import MusicLoop from './MusicLoop';


export default class MusicFormPages extends React.Component {

    isValid = () => {
        const { answers, songs } = this.props;
        const numberOfAllAnswersInSurvey = songs.length * 3;

        const questionsCompleted = Object
            .keys(answers)
            .reduce((acc, val) => {
                return acc += Object
                    .keys(answers[val])
                    .length
            }, 0);

        return questionsCompleted === numberOfAllAnswersInSurvey;
    }

    render() {
        const {
            questions,
            songs,
            currentSongIndex,
            answers,
            addAnswer,
            currentSongName,
            isLoading,
        } = this.props;

        let wellStyle = {
            background: '#fefcfc',
        };

        console.log(isLoading)

        return (
            <Row className="show-grid well center" style={wellStyle}>
                <Col xs={6} md={5} style={{ height: 343 }} className="text-center center">
                    <MusicLoop song={songs[currentSongIndex].name} />
                </Col>
                <Col xs={6} md={7}>
                    <QuestionForm
                        questions={questions}
                        currentSongIndex={currentSongIndex}
                        currentSongName={currentSongName}
                        addAnswer={addAnswer}
                        answers={answers}
                    />
                    <ButtonToolbar className="buttons-wrapper"  style={{width: '50%'}}>
                        {
                            currentSongIndex !== 0 &&
                            <Button
                                bsSize="large"
                                onClick={this.props.changeToPrevSong}
                            >
                                Wstecz
                        </Button>
                        }
                        {
                            currentSongIndex + 1 !== songs.length ?
                                <Button
                                    className="next-song-submit-btn"
                                    bsStyle="primary"
                                    bsSize="large"
                                    onClick={this.props.changeToNextSong}>
                                    Następny utwór
                                </Button>
                                : <div>
                                    {
                                        isLoading ? <div className="loader" style={{ width: 60, height: 60 }}></div>
                                            :
                                            <Button
                                                className="next-song-submit-btn"
                                                bsStyle="primary"
                                                bsSize="large"
                                                onClick={() => this.props.sendAnswers('song', this.isValid())}>
                                                Wyślij
                                    </Button>
                                    }
                                </div>
                        }
                    </ButtonToolbar>
                </Col>
            </Row>
        );
    }
};
