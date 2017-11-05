import React from "react";
import { browserHistory } from "react-router";

import { questions, songs, answers } from "../../data/";
import { PersonDetails } from "./PersonDetails/PersonDetails";
import { SongSurvey } from "./SongSurvey/SongSurvey";
import { StompSurvey } from "./StompSurvey/StompSurvey";
import { Questionnaire } from "./Questionnaire/Questionnaire";
import { SongDetails } from "./SongDetails";
import { PTS } from "./PTS/PTS";

import firebase from "../../firebase";

const allSteps = {
  PersonDetails,
  SongSurvey,
  StompSurvey,
  Questionnaire,
  PTS,
  SongDetails
};

export default class PagedForm extends React.Component {
  state = {
    currentSongIndex: 0,
    answers,
    stompAnswers: {
      tabels: {},
      track: {
        performer: "",
        name: "",
        genre: ""
      }
    },
    questionnaire: {},
    errors: {},
    songs,
    questions,
    person: {},
    response: false,
    isLoading: false,
    currentStepIndex: 0,
    PTS: {},
    steps: [
      "PersonDetails",
      "PTS",
      "StompSurvey",
      "Questionnaire",
      "SongDetails",
      "SongSurvey"
    ]
  };

  sendAnswers = (name, isValid) => {
    if (isValid) {
      this.setState({ isLoading: true });
      const itemsRef = firebase.database().ref("ankiety");
      const songAnswers = { ...this.state.answers };
      songAnswers["Stand By Me-Ben E King"] = this.state.answers[
        "Stand By Me-Ben E. King"
      ];
      delete songAnswers["Stand By Me-Ben E. King"];

      itemsRef.push({
        PTS: this.state.PTS,
        songAnswers: songAnswers,
        person: this.state.person,
        questionnaire: this.state.questionnaire,
        stompAnswers: this.state.stompAnswers
      });

      fetch(`http://${location.hostname}:8000/survey`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ response: res.success, isLoading: res.success });
        })
        .catch(e => console.log(e));
      setTimeout(() => browserHistory.push("/"), 2500);
    } else this.handleError(name);
  };

  addAnswer = e => {
    if (!e.target.value) return;

    this.setState({ errors: {} });

    const { songs, currentSongIndex } = this.state;

    const currentSongName = songs[currentSongIndex].name;
    let answers = {
      ...this.state.answers
    };

    answers[currentSongName] = {
      ...answers[currentSongName],
      [e.target.name]: e.target.value === "true"
    };
    this.setState({ answers });
  };

  changeToSong = index => {
    this.setState({
      currentSongIndex: index - 1,
      errors: {}
    });
  };

  changeToNextSong = () => {
    const { currentSongIndex } = this.state;

    this.setState({
      currentSongIndex: currentSongIndex + 1,
      errors: {}
    });
  };

  changeToPrevSong = () => {
    const { currentSongIndex } = this.state;

    this.setState({
      currentSongIndex: currentSongIndex - 1,
      errors: {}
    });
  };

  getProgress = () => {
    return Math.floor((this.state.currentSongIndex + 1) / songs.length * 100);
  };

  getPerson = person => {
    this.setState({ person });
  };

  addStompAnswers = (name, answer) => {
    this.setState({ errors: {} });
    const { stompAnswers } = this.state;
    stompAnswers.tabels[name] = answer;
    this.setState({ stompAnswers });
  };

  addTrackStomp = e => {
    this.setState({ errors: {} });
    const { stompAnswers } = this.state;
    stompAnswers.track[e.target.name] = e.target.value;
    this.setState({ stompAnswers });
  };

  handleError = name => {
    const { errors } = this.state;
    if (name === "stompSurvey") {
      errors[name] = "Musisz udzielić odpowiedzi na każde pytanie!";
      this.setState({ errors });
      window.scrollTo(0, 0);
    } else if (name === "person") {
      errors.person = "Wprowadzone dane są niewłaściwe";
      this.setState({ errors });
    } else if (name === "song") {
      const { answers } = this.state;
      const errors = {
        ...this.state.errors
      };

      let unAnsweredSongs = [];

      unAnsweredSongs = Object.keys(answers).reduce((acc, val) => {
        if (Object.keys(answers[val]).length !== 3) {
          return [...acc, val];
        }
        return acc;
      }, []);

      unAnsweredSongs = songs
        .filter((song, i) => unAnsweredSongs.includes(song.name))
        .map(song => song.id + 1)
        .join(", ")
        .toString();

      errors["notEnoughAnswers"] = `
                Musisz udzielić odpowiedzi na każde pytanie!
                Nie udzielono odpowiedzi na stronie: ${unAnsweredSongs}
            `;

      unAnsweredSongs = unAnsweredSongs.split(", ");

      this.setState({
        errors,
        currentSongIndex: Number(unAnsweredSongs[0]) - 1
      });
    } else if (name === "questionnaire") {
      errors[name] = "Musisz udzielić odpowiedzi na każde pytanie!";
      this.setState({ errors });
      window.scrollTo(0, 0);
    } else if (name === "PTS") {
      errors[name] = "Musisz udzielić odpowiedzi na każde pytanie!";
      this.setState({ errors });
      window.scrollTo(0, 0);
    }
  };

  addQuestionnaireAnswer = (id, value, name) => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        [`Q${id + 1}`]: value
      }
    }));
  };

  goToNextStep = (name, isValid = false) => {
    const { currentStepIndex } = this.state;
    if (isValid) {
      this.setState({
        currentStepIndex: currentStepIndex + 1
      });
      window.scrollTo(0, 0);
    } else this.handleError(name);
  };

  render() {
    const { songs, currentSongIndex, steps, currentStepIndex } = this.state;
    const currentSongName = songs[currentSongIndex].name;

    const ActiveStep = allSteps[steps[currentStepIndex]];

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
          addSssAnswers={this.addSssAnswers}
          addQuestionnaireAnswer={this.addQuestionnaireAnswer}
        />
      </div>
    );
  }
}
