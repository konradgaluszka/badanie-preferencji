import React from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

import { QuestionForm } from './QuestionForm';
import MusicLoop from './MusicLoop';


export default class MusicFormPages extends React.Component {
    render() {
        const { questions, songs, currentSongIndex, answers, addAnswer } = this.props;
        let wellStyle = {
            background: '#fefcfc'
        };

        return (
            <Row className="show-grid well" style={wellStyle}>
                <Col xs={6} md={5} className="text-center">
                    <MusicLoop song={songs[currentSongIndex].filename}/>
                </Col>
                <Col xs={6} md={7}>
                    <QuestionForm
                        questions={questions}
                        currentSongIndex={currentSongIndex}
                        addAnswer={addAnswer}
                        answers={answers}
                    />
                    <ButtonToolbar>
                        <Button bsSize="large" onClick={this.props.changeToPrevSong}>
                            Wstecz</Button>
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            onClick={this.props.changeToNextSong}
                            disabled={false}>Następne pytanie</Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        );
    }
};
