import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import {genres, musicCharacters} from '../../../data';
import {TableRow} from './TableRow';

export class StompSurvey extends Component {
    render() {
        const {addStompAnswers, stompAnswers, addTrackStomp, goToNextStep, errors} = this.props;
        const {performer, name, genre} = stompAnswers.track;
        const areAllStompAnswers = Object
            .keys(stompAnswers.tabels)
            .length === Object.keys(genres).length + Object.keys(musicCharacters).length;

        const isValid = areAllStompAnswers && performer !== '' && name !== '' && genre !== '';

        return (
            <Row className="show-grid well center stompSurvey">
                <Col md={5}>
                    {
                        errors.stompSurvey && <div className="alert alert-danger text-center">
                            {errors.stompSurvey}
                        </div>
                    }
                    <div>
                        <p>
                            Określ, w jakim stopniu lubisz każdy z wymienionych poniżej gatunków muzycznych.
                            Swoją odpowiedź zaznacz, naciskając w odpowiednią cyfrę.
                        </p>
                        <ul>
                            <li>1. Jeśli 
                                <strong> W OGÓLE </strong>
                                nie lubisz</li>
                            <li>2. Jeśli
                                <strong> NIE LUBISZ </strong>
                                takiej muzyki</li>
                            <li>3. Jeśli
                                <strong> RACZEJ NIE LUBISZ </strong>
                                takiej muzyki</li>
                            <li>4. Jeśli
                                <strong> NIE WIESZ</strong>, trudno Ci jest określić</li>
                            <li>5. Jeśli
                                <strong> RACZEJ LUBISZ </strong>
                                taką muzykę</li>
                            <li>6. Jeśli
                                <strong> LUBISZ </strong>
                                taką muzykę</li>
                            <li>7. Jeśli
                                <strong> ZDECYDOWANIE LUBISZ </strong>
                                taką muzykę</li>
                        </ul>
                    </div>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            {genres.map((genre, i) => <TableRow
                                addStompAnswers={addStompAnswers}
                                key={genre}
                                index={i}
                                firstCell={genre}/>)}
                        </tbody>
                    </table>
                    <div>
                        <p>
                            Wpisz wykonawcę i tytuł swojego ulubionego utworu lub swojej ulubionej płyty.
                            Następnie kierując się listą gatunków powyżej, przypisz numer gatunku, do
                            którego można zaliczyć wskazany przez Ciebie utwór/płytę.
                        </p>
                        <div>
                            <div className="stomp-track-wrapper">
                                <label>A. Wykonawca</label>
                                <input name="performer" onChange={addTrackStomp} value={performer}/>
                            </div>
                            <div className="stomp-track-wrapper">
                                <label>B. Tytuł utworu/płyty</label>
                                <input name="name" onChange={addTrackStomp} value={name}/>
                            </div>
                            <div className="stomp-track-wrapper">
                                <label>C. Gatunek muzyczny</label>
                                <input name="genre" onChange={addTrackStomp} value={genre}/>
                                <span>(Wpisz numer odpowiedniego gatunku z listy powyżej)</span>
                            </div>
                        </div>
                    </div>
                    <p style={{
                        marginTop: 50
                    }}>Określ,
                        używając listy poniżej, jaki charakter ma ta muzyka? Swoją odpowiedź zaznacz,
                        zakreślając kółkiem odpowiednią cyfrę.</p>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            {musicCharacters.map((character, i) => <TableRow
                                addStompAnswers={addStompAnswers}
                                key={character}
                                index={i}
                                firstCell={character}/>)}
                        </tbody>
                    </table>
                    <Button
                        className='btn-next'
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => goToNextStep('stompSurvey', isValid)}>
                        Dalej
                    </Button>
                </Col>
            </Row>
        )
    }
}
