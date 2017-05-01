import React from 'react';
import { Image } from 'react-bootstrap';

import image from '../static/images/music.jpg';


    export default class MusicLoop extends React.Component {
        state = {
            isLoaded: false
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.song !== this.props.song) {
                this.setState({
                    isLoaded: false
                });
            }
        }

        playSong = () => {
            setTimeout(() => {
                this.audio.play();
                this.setState({ isLoaded: true,});
                }, 300);
        }

        render() {
            const { song } = this.props;
            const { isLoaded } = this.state;

            return (
                <div>
                    { isLoaded ? 
                        <Image src={image} responsive/> :
                        <div className="loader"></div> 
                    }
                    <audio
                        ref={audio => this.audio = audio}
                        preload="auto"
                        src={require(`../static/songs/${song}.mp3`)}
                        loop={true}
                        autoPlay={false}
                        onCanPlayThrough={() => this.playSong()}
                    />
                </div>
            );
        }
    };
