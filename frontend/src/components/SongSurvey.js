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

import MusicFormPages from './MusicFormPages';


export class SongSurvey extends React.Component {

    render() {
        const {
            songs,
            questions,
            currentSongIndex,
            currentSongName,
            changeToNextSong,
            changeToPrevSong,
            changeToSong,
            getProgress,
            answers,
            sendAnswers,
            addAnswer,
            errors,
            response
         } = this.props;

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
                                <div className="alert alert-danger text-center song-error">
                                    {errors.notEnoughAnswers}
                                </div>
                            }
                            {
                                response &&
                                <div className="alert alert-success text-center song-error">Dziękuję za wypełnienie ankiety!</div>
                            }
                        </Col>
                    </Row>
                        <MusicFormPages
                            questions={questions}
                            songs={songs}
                            currentSongIndex={currentSongIndex}
                            currentSongName={currentSongName}
                            changeToNextSong={changeToNextSong}
                            changeToPrevSong={changeToPrevSong}
                            answers={answers}
                            addAnswer={addAnswer}
                            sendAnswers={sendAnswers}
                        />
                    </div>
                <hr/>
                <Row className="show-grid text-center">
                    <ProgressBar now={getProgress()} label={`${getProgress()}%`}/> 
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={songs.length}
                            maxButtons={10}
                            activePage={currentSongIndex + 1}
                            onSelect={changeToSong}
                        />
                </Row>
                <hr/>
            </Grid>
        );
    }
};
