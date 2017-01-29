import React from 'react';
import {Image} from 'react-bootstrap';

export default class MusicLoop extends React.Component {
    constructor() {
        super();
        this.myAudio = undefined;
        this.state = {currentTime: 0};
        this.count = this.count.bind(this);
        this.repeatPlaying = this.repeatPlaying.bind(this);
    }

    count() {
        this.setState({currentTime: this.state.currentTime + 1});
    }

    repeatPlaying(){
        this.myAudio.play();
    }

    changeToSong(song) {
        if(song === this.state.currentSong) {
            return;
        }
        if (this.myAudio != undefined) {
            this.myAudio.pause();
        }
        this.state.currentTime = 0;
        this.state.currentSong = song;
        this.myAudio = new Audio('/songs/' + song);
        this.myAudio.addEventListener('ended', this.repeatPlaying , false);
        this.myAudio.play();
        if(this.state.intervalId == undefined) {
            let intervalId = setInterval(this.count, 1000);
            this.state.intervalId = intervalId;
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        this.changeToSong(this.props.song);
        let toNiceTime = (time) => {
          let minutes = Math.floor(time / 60);
          let seconds = time - 60 * minutes;
          return minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " : " + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        };
        return (
            <div>
                <Image src={"/images/music.jpg"} responsive/>
                <h2>{toNiceTime(this.state.currentTime)}</h2>
            </div>
        );
    }
};
