import React from 'react';
import MusicLoop from './MusicLoop';
import AnswerForSingleQuestion from './AnswerForSingleQuestion';
import {Row, Col, PageHeader, Radio, small, ButtonToolbar, Button} from 'react-bootstrap';

export default class MusicFormPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: this.props.songs.map(() => {return []})
        };
    }

    render() {
        let boolean = (b) => {
            return b === 'true';
        };

        let currentSong = () => {
            return this.props.songs[this.props.currentSongIndex()];
        };

        let answerChangedForQuestion = (questionIndex) => {
            return (inputValue) => {
                let stateChange = this.state.answers;
                stateChange[this.props.currentSongIndex()][questionIndex] = boolean(inputValue.currentTarget.value);
                this.setState(stateChange);
            };
        };

        let answerForQuestion = (questionIndex) => {
            return (answer) => {
                return this.state.answers[this.props.currentSongIndex()][questionIndex] === answer;
            };
        };

        let wellStyle = {
            background: '#fefcfc'
        };

        return (
        <Row className="show-grid well" style={wellStyle}>
            <Col xs={6} md={5} className="text-center">
                <MusicLoop song={currentSong().file}/>
            </Col>
            <Col xs={6} md={7}>
                <AnswerForSingleQuestion
                    questionId="firstQuestion"
                    question={"1. " + this.props.questions[0].text}
                    isYesChecked={answerForQuestion(0)(true)}
                    isNoChecked={answerForQuestion(0)(false)}
                    answerChanged={answerChangedForQuestion(0)}
                />
                <AnswerForSingleQuestion
                    questionId="secondQuestion"
                    question={"2. " + this.props.questions[1].text}
                    isYesChecked={answerForQuestion(1)(true)}
                    isNoChecked={answerForQuestion(1)(false)}
                    answerChanged={answerChangedForQuestion(1)}
                />
                <AnswerForSingleQuestion
                    questionId="thirdQuestion"
                    question={"3. " + this.props.questions[2].text}
                    isYesChecked={answerForQuestion(2)(true)}
                    isNoChecked={answerForQuestion(2)(false)}
                    answerChanged={answerChangedForQuestion(2)}
                />
                <ButtonToolbar>
                    <Button bsSize="large" onClick={this.props.changeToPrevSong}>
                        Wstecz</Button>
                    <Button bsStyle="primary" bsSize="large" onClick={this.props.changeToNextSong}
                            disabled={this.props.currentSongIndex() == this.props.songs.length - 1}>Następne pytanie</Button>
                </ButtonToolbar>
            </Col>
        </Row>
        );
    }
};
