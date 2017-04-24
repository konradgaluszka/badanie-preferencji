import React from 'react';
import {
    Grid,
    Row,
    Col,
    PageHeader,
    ProgressBar,
    Pagination,
    small
} from 'react-bootstrap';

import { questions, songs } from '../data/questions';
import MusicFormPages from './MusicFormPages';


export default class PagedForm extends React.Component {
    state = {
        currentSongIndex: 0,
        answers: {}
    }

    addAnswer = (e) => {
        const { currentSongIndex } = this.state;
        let answers = {
            ...this.state.answers
        };
        answers[currentSongIndex] = {
            ...answers[currentSongIndex],
            [e.target.name]: e.target.value === "true"
        };
        this.setState({ answers })
    }

    changeToSong = index => {
        this.setState({
            currentSongIndex: index - 1
        });
    }

    changeToNextSong = () => {
        this.setState({
            currentSongIndex: this.state.currentSongIndex + 1
        })
    };

    changeToPrevSong = () => {
        if (this.state.currentSongIndex === 0) {
            // TODO: support saving answers on component unmount
            // this.setState({locationInForm: 'hello', currentSongIndex: -1});
        } else {
            this.setState({
                currentSongIndex: this.state.currentSongIndex - 1
            });
        }
    };

    getProgress = () => {
        return Math.floor(((this.state.currentSongIndex + 1) / songs.length) * 100);
    };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={8}>
                        <PageHeader>
                            Część słuchowa <small>Posłuchaj i odpowiedz na pytania</small>
                        </PageHeader>
                    </Col>
                </Row>
                    <MusicFormPages
                        questions={questions}
                        songs={songs}
                        currentSongIndex={this.state.currentSongIndex}
                        changeToNextSong={this.changeToNextSong}
                        changeToPrevSong={this.changeToPrevSong}
                        answers={this.state.answers}
                        addAnswer={this.addAnswer}
                    />
                <hr/>
                <Row className="show-grid text-center">
                    <ProgressBar now={this.getProgress()} label={`${this.getProgress()}%`}/> 
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
                            onSelect={this.changeToSong}
                        />
                </Row>
                <hr/>
            </Grid>
        );
    }
};
