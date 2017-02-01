import React from 'react';
import {Grid, Row, Col, Image, PageHeader, Radio, ProgressBar, Pagination, small, ButtonToolbar, Button} from 'react-bootstrap';
import {questions, songs} from '../data/questions';
import MusicLoop from './MusicLoop';

export default class PagedForm extends React.Component {
    constructor() {
        super();
        this.state = {
            currentSongIndex: 1,
            answers: songs.map(() => {return []})
        };
    }

    render() {
        let boolean = (b) => {
            return b === 'true';
        };

        let currentSong = () => {
            return songs[this.state.currentSongIndex];
        };

        let changeToNextSong = () => {
            this.setState({currentSongIndex: Math.min(this.state.currentSongIndex + 1, songs.length - 1)})
        };

        let changeToPrevSong = () => {
            this.setState({currentSongIndex: Math.max(this.state.currentSongIndex - 1, 0)})
        };

        let changeToSong = (index) => {
            this.setState({currentSongIndex: index - 1});
        };

        let getProgress = () => {
          return Math.floor(((this.state.currentSongIndex + 1) / songs.length ) * 100);
        };

        let answerChangedForQuestion = (questionIndex) => {
            return (inputValue) => {
                let stateChange = this.state.answers;
                stateChange[this.state.currentSongIndex][questionIndex] = boolean(inputValue.currentTarget.value);
                this.setState(stateChange);
            };
        };

        let answerForQuestion = (questionIndex) => {
            return (answer) => {
                return this.state.answers[this.state.currentSongIndex][questionIndex] === answer;
            };
        };

        let wellStyle = {
          background: '#fefcfc'
        };
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={8}>
                        <PageHeader>Część słuchowa <small>Posłuchaj i odpowiedz na pytania</small></PageHeader>
                    </Col>
                </Row>
                <Row className="show-grid well" style={wellStyle}>
                    <Col xs={6} md={5} className="text-center">
                        <MusicLoop song={currentSong().file}/>
                    </Col>
                    <Col xs={6} md={7}>
                        <strong>1. {questions[0].text}</strong>
                        <br/>
                        <input type="radio" name="tak-0"
                               value={true}
                               checked={answerForQuestion(0)(true)}
                               onChange={answerChangedForQuestion(0)} /> Tak
                        <br/>
                        <input type="radio" name="nie-0"
                               value={false}
                               checked={answerForQuestion(0)(false)}
                               onChange={answerChangedForQuestion(0)} /> Nie
                        <br/>
                        <strong>2. {questions[1].text}</strong>
                        <br/>
                        <input type="radio" name="tak-1"
                               value={true}
                               checked={answerForQuestion(1)(true)}
                               onChange={answerChangedForQuestion(1)} /> Tak
                        <br/>
                        <input type="radio" name="nie-1"
                               value={false}
                               checked={answerForQuestion(1)(false)}
                               onChange={answerChangedForQuestion(1)} /> Nie
                        <br/>
                        <strong>3. {questions[2].text}</strong>
                        <br/>
                        <input type="radio" name="tak-2"
                               value={true}
                               checked={answerForQuestion(2)(true)}
                               onChange={answerChangedForQuestion(2)} /> Tak
                        <br/>
                        <input type="radio" name="nie-2"
                               value={false}
                               checked={answerForQuestion(2)(false)}
                               onChange={answerChangedForQuestion(2)} /> Nie
                        <br/>
                        <ButtonToolbar>
                            <Button bsSize="large" onClick={changeToPrevSong} disabled={this.state.currentSongIndex == 0}>
                                Wstecz</Button>
                            <Button bsStyle="primary" bsSize="large" onClick={changeToNextSong}
                                    disabled={this.state.currentSongIndex == songs.length - 1}>Następne pytanie</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid text-center">
                    <ProgressBar now={getProgress()} label={`${getProgress()}%`} />
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={songs.length}
                            maxButtons={10}
                            activePage={this.state.currentSongIndex + 1}
                            onSelect={changeToSong} />
                </Row>
                <hr/>
            </Grid>
        );
    }
};
