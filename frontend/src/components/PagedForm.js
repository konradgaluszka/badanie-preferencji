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
        answers: {},
        errors: {},
        songs,
        questions,
    }

    sendAnswers = () => {
        const { answers } = this.state;
        let errors = {...this.state.errors}

        const numberOfAllAnswersInSurvey = songs.length * 3;
        const questionsCompleted = Object
            .keys(answers)
            .reduce((acc, val) =>  {
                return acc += Object.keys(answers[val]).length
            }, 0)
        if (questionsCompleted < numberOfAllAnswersInSurvey) {
            errors['notEnoughAnswers'] = 'Musisz udzielić odpowiedzi na każde pytanie!';
            this.setState({ errors });
        }
    }

    addAnswer = (e) => {
        if (!e.target.value) return;

        const { songs, currentSongIndex } = this.state;

        const currentSongName = songs[currentSongIndex].name;
        let answers = {...this.state.answers};

        answers[currentSongName] = {
            ...answers[currentSongName],
            [e.target.name]: e.target.value === "true"
        };
            this.setState({ answers, errors: {} });
    }

    changeToSong = index => {
        this.setState({
            currentSongIndex: index - 1,
            errors: {}
        });
    }

    changeToNextSong = () => {
        const { currentSongIndex } = this.state;

        this.setState({
            currentSongIndex: currentSongIndex + 1,
            errors: {}
        })
    };

    changeToPrevSong = () => {
        const { currentSongIndex } = this.state;

        this.setState({
            currentSongIndex: currentSongIndex - 1,
            errors: {}
        })
    };

    getProgress = () => {
        return Math.floor(((this.state.currentSongIndex + 1) / songs.length) * 100);
    };

    render() {
        const { songs, questions, currentSongIndex, errors } = this.state;
        const currentSongName = songs[currentSongIndex].name;

        return (
            <Grid>
                <div>
                    <Row className="show-grid">
                        <Col style={{marginLeft: 195}} xs={6} md={8}>
                            <PageHeader>
                                Część słuchowa <small>Posłuchaj i odpowiedz na pytania</small>
                            </PageHeader>
                            { 
                                errors.notEnoughAnswers && 
                                <div className="alert alert-danger text-center">
                                    {errors.notEnoughAnswers}
                                </div>
                            }
                        </Col>
                    </Row>
                        <MusicFormPages
                            questions={questions}
                            songs={songs}
                            currentSongIndex={currentSongIndex}
                            currentSongName={currentSongName}
                            changeToNextSong={this.changeToNextSong}
                            changeToPrevSong={this.changeToPrevSong}
                            answers={this.state.answers}
                            addAnswer={this.addAnswer}
                            sendAnswers={this.sendAnswers}
                        />
                    </div>
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
