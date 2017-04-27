import React from 'react';
import { Image } from 'react-bootstrap';

import image from '../static/images/music.jpg';


export default class MusicLoop extends React.Component {
    constructor() {
        super();
        this.myAudio = undefined;
        this.state = {currentTime: 0};
        this.timeSums = 0;
        this.count = this.count.bind(this);
        this.repeatPlaying = this.repeatPlaying.bind(this);
    }

    count() {
        this.setState({currentTime: this.timeSums + this.myAudio.currentTime});
    }

    repeatPlaying() {
        this.timeSums = this.timeSums + this.myAudio.currentTime;
        this.myAudio.play();
    }

    changeToSong(song) {
        if(song === this.state.currentSong) {
            return;
        }
        if (this.myAudio !== undefined) {
            this.myAudio.pause();
        }
        this.setState({
            currentTime: 0,
            currentSong: song,
        });
        this.myAudio = new Audio('/songs/' + song);
        this.myAudio.addEventListener('ended', this.repeatPlaying , false);
        this.myAudio.play();
        if(this.state.intervalId === undefined) {
            let intervalId = setInterval(this.count, 1000);
            this.setState({intervalId});
        }
    }

    componentWillUnmount() {
        // clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <div>
                <Image src={image} responsive/>
                <audio preload="auto" src={require('../static/songs/' + this.props.song )} loop="true" autoPlay="true"/>
            </div>
        );
    }
};
