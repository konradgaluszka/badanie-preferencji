import React from 'react';
import {browserHistory} from 'react-router'

import {questions, songs, answers} from '../../data/';
import {PersonDetails} from './PersonDetails/PersonDetails'
import {SongSurvey} from './SongSurvey/SongSurvey';
import {StompSurvey} from './StompSurvey/StompSurvey';
import {SssTest} from './SssTest/SssTest';

const allSteps = {
    PersonDetails,
    SongSurvey,
    StompSurvey,
    SssTest
};

export default class PagedForm extends React.Component {
    state = {
        currentSongIndex: 0,
        answers,
        stompAnswers: {
            tabels: {},
            track: {
                performer: '',
                name: '',
                genre: ''
            }
        },
        sssAnswers: {},
        errors: {},
        songs,
        questions,
        person: {},
        response: false,
        currentStepIndex: 0,
        steps: ['PersonDetails', 'SongSurvey', 'StompSurvey', 'SssTest']
    }

    sendAnswers = (name, isValid) => {
        if (isValid) {
            fetch(`http://localhost:8000/survey`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                    method: "POST",
                    body: JSON.stringify(this.state)
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({response: res.success})
                    setTimeout(() => browserHistory.push('/'), 2500)
                });
        } else this.handleError(name)
    }

    addAnswer = (e) => {
        if (!e.target.value) 
            return;
        
        this.setState({errors: {}})

        const {songs, currentSongIndex} = this.state;

        const currentSongName = songs[currentSongIndex].name;
        let answers = {
            ...this.state.answers
        };

        answers[currentSongName] = {
            ...answers[currentSongName],
            [e.target.name]: e.target.value === "true"
        };
        this.setState({answers});
    }

    addSssAnswers = (e) => {
        if (!e.target.value) 
            return;
        this.setState({errors: {}})

        const {sssAnswers} = this.state;
        sssAnswers[`SSS${e.target.name}`] = Number(e.target.value);
        this.setState({sssAnswers});
    }

    changeToSong = index => {
        this.setState({
            currentSongIndex: index - 1,
            errors: {}
        });
    }

    changeToNextSong = () => {
        const {currentSongIndex} = this.state;

        this.setState({
            currentSongIndex: currentSongIndex + 1,
            errors: {}
        })
    };

    changeToPrevSong = () => {
        const {currentSongIndex} = this.state;

        this.setState({
            currentSongIndex: currentSongIndex - 1,
            errors: {}
        })
    };

    getProgress = () => {
        return Math.floor(((this.state.currentSongIndex + 1) / songs.length) * 100);
    };

    getPerson = (person) => {
        this.setState({person});
    }

    addStompAnswers = (name, answer) => {
        this.setState({errors: {}});
        const {stompAnswers} = this.state;
        stompAnswers.tabels[name] = answer;
        this.setState({stompAnswers});
    }

    addTrackStomp = (e) => {
        this.setState({errors: {}});
        const {stompAnswers} = this.state;
        stompAnswers.track[e.target.name] = e.target.value;
        this.setState({stompAnswers})
    }

    handleError = (name) => {
        const {errors} = this.state;
        if (name === 'stompSurvey') {
            errors[name] = 'Musisz udzielić odpowiedzi na każde pytanie!';
            this.setState({errors});
            window.scrollTo(0, 0);
        } else if (name === 'person') {
            errors.person = 'Wprowadzone dane są niewłaściwe';
            this.setState({errors});
        } else if (name === 'song') {
            const {answers} = this.state;
            const errors = {
                ...this.state.errors
            }

            let unAnsweredSongs = [];

            unAnsweredSongs = Object
                .keys(answers)
                .reduce((acc, val) => {
                    if (Object.keys(answers[val]).length !== 3) {
                        return [
                            ...acc,
                            val
                        ];
                    }
                    return acc;
                }, []);

            unAnsweredSongs = songs.filter((song, i) => unAnsweredSongs.includes(song.name))
                .map(song => song.id + 1)
                .join(', ')
                .toString();

            errors['notEnoughAnswers'] = `
                Musisz udzielić odpowiedzi na każde pytanie!
                Nie udzielono odpowiedzi na stronie: ${unAnsweredSongs}
            `;

            unAnsweredSongs = unAnsweredSongs.split(', ');

            this.setState({
                errors,
                currentSongIndex: Number(unAnsweredSongs[0]) - 1
            });
        } else if (name === 'sssTest') {
            errors.sssTest = 'Musisz udzielić odpowiedzi na każde pytanie!';
            this.setState({errors});
            window.scrollTo(0, 0);
        }
    }

    goToNextStep = (name, isValid = false) => {
        const {currentStepIndex} = this.state;
        if (isValid) {
            this.setState({
                currentStepIndex: currentStepIndex + 1
            });
            window.scrollTo(0, 0);
        } else 
            this.handleError(name)
    }

    render() {
        const {songs, currentSongIndex, steps, currentStepIndex} = this.state;
        const currentSongName = songs[currentSongIndex].name;

        const ActiveStep = allSteps[steps[currentStepIndex]]

        return (
            <div className="paged-form">
                <ActiveStep
                    {...this.state}
                    currentSongName={currentSongName}
                    sendAnswers={this.sendAnswers}
                    getPerson={this.getPerson}
                    getProgress={this.getProgress}
                    changeToPrevSong={this.changeToPrevSong}
                    changeToNextSong={this.changeToNextSong}
                    changeToSong={this.changeToSong}
                    addAnswer={this.addAnswer}
                    addStompAnswers={this.addStompAnswers}
                    addTrackStomp={this.addTrackStomp}
                    goToNextStep={this.goToNextStep}
                    addSssAnswers={this.addSssAnswers} />
            </div>
        );
    }
};
