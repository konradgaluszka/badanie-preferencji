import React from 'react';
import { browserHistory } from 'react-router'

import { questions, songs, answers } from '../data/questions';
import { PersonDetails } from './PersonDetails'
import { SongSurvey } from './SongSurvey';


const allSteps = { PersonDetails, SongSurvey };

export default class PagedForm extends React.Component {
    state = {
        currentSongIndex: 0,
        answers,
        errors: {},
        songs,
        questions,
        person: {},
        response: false,
        step: 'PersonDetails'
    }

    sendAnswers = () => {
        const { answers } = this.state;
        this.setState({ errors: {} })
        let errors = {...this.state.errors}
        let unAnsweredSongs = [];

        const numberOfAllAnswersInSurvey = songs.length * 3;

        const questionsCompleted = Object
            .keys(answers)
            .reduce((acc, val) =>  {
                if (Object.keys(answers[val]).length !== 3) {
                    unAnsweredSongs.push(val)
                }
                return acc += Object.keys(answers[val]).length
            }, 0);
        if (questionsCompleted < numberOfAllAnswersInSurvey) {
            unAnsweredSongs = songs
                .filter((song, i) => unAnsweredSongs.includes(song.name))
                .map(song => song.id + 1).join(', ').toString();
            
            errors['notEnoughAnswers'] = `
                Nie udzielono odpowiedzi dla ${unAnsweredSongs.split(',').length} utworu/ów!
                Musisz udzielić odpowiedzi na każde pytanie!
                Nie udzielono odpowiedzi na stronie: ${unAnsweredSongs}
            `;

            this.setState({
                errors,
                currentSongIndex: unAnsweredSongs[0] - 1
            });
            return;
        }
        fetch('http://backend:8000/survey',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(res => {
            this.setState({response: res.success})
            setTimeout(() => browserHistory.push('/'), 2500)
        });
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
            this.setState({ answers });
    }

    changeToSong = index => {
        this.setState({
            currentSongIndex: index - 1,
        });
    }

    changeToNextSong = () => {
        const { currentSongIndex } = this.state;

        this.setState({
            currentSongIndex: currentSongIndex + 1,
        })
    };

    changeToPrevSong = () => {
        const { currentSongIndex } = this.state;

        this.setState({
            currentSongIndex: currentSongIndex - 1,
        })
    };

    getProgress = () => {
        return Math.floor(((this.state.currentSongIndex + 1) / songs.length) * 100);
    };

    getPerson = (person) => {
        this.setState({
            person,
            step: 'SongSurvey',
        });
    }

    render() {
        const { songs, currentSongIndex, step } = this.state;
        const currentSongName = songs[currentSongIndex].name;

        const ActiveStep = allSteps[step]

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
                />
            </div>
        );
    }
};
