import React from 'react';

import { questions, songs, answers } from '../data/questions';
import { PersonDetails } from './PersonDetails'
import { SongSurvey } from './SongSurvey';


export default class PagedForm extends React.Component {
    state = {
        currentSongIndex: 0,
        answers,
        errors: {},
        songs,
        questions,
        person: {}
    }

    sendAnswers = () => {
        const { answers } = this.state;
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

    getPerson = (person) => {
        this.setState({ person });
    }

    render() {
        const { songs, questions, currentSongIndex, errors, person } = this.state;
        const currentSongName = songs[currentSongIndex].name;

        return (
            <div className="wizard">
                {
                    person.age && person.gender ?
                    <SongSurvey
                        questions={questions}
                        songs={songs}
                        currentSongIndex={currentSongIndex}
                        currentSongName={currentSongName}
                        changeToNextSong={this.changeToNextSong}
                        changeToPrevSong={this.changeToPrevSong}
                        changeToSong={this.changeToSong}
                        answers={this.state.answers}
                        addAnswer={this.addAnswer}
                        sendAnswers={this.sendAnswers}
                        errors={errors}
                        getProgress={this.getProgress}
                    /> :
                    <PersonDetails 
                        getPerson={this.getPerson}
                    />
                }
            </div>
        );
    }
};
