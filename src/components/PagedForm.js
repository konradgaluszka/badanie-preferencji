import React from 'react';
import {Grid, Row, Col, Image, PageHeader, Radio, ProgressBar, Pagination, small, ButtonToolbar, Button} from 'react-bootstrap';
import {questions, songs} from '../data/questions';
import MusicLoop from './MusicLoop';
import HelloPage from './HelloPage';
import AnswerForSingleQuestion from './AnswerForSingleQuestion';

export default class PagedForm extends React.Component {
    constructor() {
        super();
        this.state = {
            locationInForm: 'hello',
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
            if (this.state.currentSongIndex == 0) {
                this.setState({locationInForm: 'hello'})    ;
            } else {
                this.setState({currentSongIndex: this.state.currentSongIndex - 1});
            }

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

        let getPageContent = () => {
          if (this.state.locationInForm === 'hello') {
              return (
                  <Row className="show-grid" >
                      <HelloPage changeToNextPage={() => {
                          this.state.locationInForm = 'listen';
                          this.setState(this.state);
                      }}/>
                  </Row>
              );
          } else if (this.state.locationInForm === 'listen') {
              return (
                  <Row className="show-grid well" style={wellStyle}>
                      <Col xs={6} md={5} className="text-center">
                          <MusicLoop song={currentSong().file}/>
                      </Col>
                      <Col xs={6} md={7}>
                          <AnswerForSingleQuestion
                              questionId="firstQuestion"
                              question={"1. " + questions[0].text}
                              isYesChecked={answerForQuestion(0)(true)}
                              isNoChecked={answerForQuestion(0)(false)}
                              answerChanged={answerChangedForQuestion(0)}
                          />
                          <AnswerForSingleQuestion
                              questionId="secondQuestion"
                              question={"2. " + questions[1].text}
                              isYesChecked={answerForQuestion(1)(true)}
                              isNoChecked={answerForQuestion(1)(false)}
                              answerChanged={answerChangedForQuestion(1)}
                          />
                          <AnswerForSingleQuestion
                              questionId="thirdQuestion"
                              question={"3. " + questions[2].text}
                              isYesChecked={answerForQuestion(2)(true)}
                              isNoChecked={answerForQuestion(2)(false)}
                              answerChanged={answerChangedForQuestion(2)}
                          />

                          <ButtonToolbar>
                              <Button bsSize="large" onClick={changeToPrevSong}>
                                  Wstecz</Button>
                              <Button bsStyle="primary" bsSize="large" onClick={changeToNextSong}
                                      disabled={this.state.currentSongIndex == songs.length - 1}>Następne pytanie</Button>
                          </ButtonToolbar>
                      </Col>
                  </Row>
              );
          } else {
              throw new Error("Unhandled location in form");
          }
        };

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={8}>
                        <PageHeader>Część słuchowa <small>Posłuchaj i odpowiedz na pytania</small></PageHeader>
                    </Col>
                </Row>
                {getPageContent()}
                <hr/>
                <Row className="show-grid text-center">
                    <ProgressBar now={getProgress()} label={`${getProgress()}%`}/>
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
