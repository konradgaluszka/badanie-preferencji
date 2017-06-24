import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import {sssQuestions} from '../../../data';

export class SssTest extends Component {
    render() {
        const {addSssAnswers, sssAnswers, errors, sendAnswers} = this.props;
        const numberOfAllSssQuestions = Object.keys(sssQuestions).length;
        const numberofAllSssAnswers = Object.keys(sssAnswers).length;
        return (
            <Row className="show-grid well center">
                <Col md={5}>
                    {
                        errors.sssTest && <div className="alert alert-danger text-center">
                            {errors.sssTest}
                        </div>
                    }
                    <div className="sss-test">
                        <div className="sss-instruction-wrapper">
                            <p>Skala poszukiwania doznań, forma V (SSS-V)</p>
                            <p>
                                <strong>Instrukcja</strong>: każda z niżej podanych pozycji zawiera dwa stwierdzenia: A i B.
                                Proszę zaznaczyć literę (A albo B) tego stwierdzenia, które najpełniej
                                odzwierciedla Twoje upodobania lub odczucia. W niektórych przypadkach oba
                                stwierdzenia mogą być bliskie Twoich upodobań lub odczuć. Proszę wybrać jednak
                                to, które opisuje je najlepiej. W pewnych przypadkach, żadne ze stwierdzeń nie
                                będzie Ci odpowiadać. W tej sytuacji wybierz to, które mniej odbiega od Twoich
                                upodobań lub odczuć.
                            </p>
                            <p>
                                Istotne jest, aby wybrać w odniesieniu do wszystkich pozycji tylko jedno
                                stwierdzenie - A lub B. Interesują mnie Twoje upodobania i odczucia, nie zaś jak
                                inni reagują na te rzeczy, albo co powinni odczuwać. Nie ma tu odpowiedzi
                                dobrych ani złych, jak w innych rodzajach testów. Bądź szczery/a i daj uczciwą
                                ocenę siebie samego.
                            </p>
                        </div>
                        {sssQuestions.map(question => (
                            <div key={question.id} className="sss-questions">
                                <span>{question.id + 1}.</span>
                                <div className="sss-checkbox-question-wrapper">
                                    <input
                                        type="radio"
                                        name={question.id + 1}
                                        value={0}
                                        id={`A${question.id}`}
                                        onChange={(e) => addSssAnswers(e)}/>
                                    <label htmlFor={`A${question.id}`} onClick={(e) => addSssAnswers(e)}>A. {question.A}</label>
                                </div>
                                <div className="sss-checkbox-question-wrapper">
                                    <input
                                        type="radio"
                                        name={question.id + 1}
                                        value={1}
                                        id={`B${question.id}`}
                                        onChange={(e) => addSssAnswers(e)}/>
                                    <label htmlFor={`B${question.id}`} onClick={(e) => addSssAnswers(e)}>B. {question.B}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        className='btn-next'
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => sendAnswers('sssTest', numberOfAllSssQuestions === numberofAllSssAnswers)}
                        >
                        Wyślij
                    </Button>
                </Col>
            </Row>
        );
    }
}
