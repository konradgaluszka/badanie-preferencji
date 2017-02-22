import React from 'react';
import {Grid, Row, Col, Image, PageHeader, Radio, ProgressBar, Pagination, small, ButtonToolbar, Button} from 'react-bootstrap';
import {questions, songs} from '../data/questions';
import HelloPage from './HelloPage';
import MusicFormPages from './MusicFormPages';

export default class PagedForm extends React.Component {
    constructor() {
        super();
        this.state = {
            locationInForm: 'hello',
            currentSongIndex: -1
        };
    }

    render() {
        let changeToSong = (index) => {
            this.setState({locationInForm: 'listen', currentSongIndex: index - 1});
        };

        let changeToNextSong = () => {
            this.setState({currentSongIndex: Math.min(this.state.currentSongIndex + 1, songs.length - 1)})
        };

        let changeToPrevSong = () => {
            if (this.state.currentSongIndex == 0) {
                //TODO: support saving answers on component unmount
                //this.setState({locationInForm: 'hello', currentSongIndex: -1});
            } else {
                this.setState({currentSongIndex: this.state.currentSongIndex - 1});
            }
        };

        let getProgress = () => {
          return Math.floor(((this.state.currentSongIndex + 1) / songs.length ) * 100);
        };

        let getPageContent = () => {
          if (this.state.locationInForm === 'hello') {
              return (
                      <HelloPage changeToNextPage={() => changeToSong(1)}/>
              );
          } else if (this.state.locationInForm === 'listen') {
              return (
                  <MusicFormPages questions={questions}
                                  songs={songs}
                                  currentSongIndex={() => this.state.currentSongIndex}
                                  changeToNextSong={changeToNextSong}
                                  changeToPrevSong={changeToPrevSong}
                  />
              );
          } else {
              throw new Error("Unhandled location in form");
          }
        };

        let getPagination = () => {
          if (this.state.locationInForm === 'listen') {
              return (
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
              );
          }  else {
              return (
                  <div></div>
              );
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
                    {getPagination()}
                </Row>
                <hr/>
            </Grid>
        );
    }
};
