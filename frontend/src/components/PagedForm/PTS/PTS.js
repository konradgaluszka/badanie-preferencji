import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";

import { PTSquestions } from "../../../data";

export class PTS extends Component {
  getStyles = (id, number) => {
    const { PTS } = this.props;
    if (PTS[`Q${id + 1}`] === number) {
      return {
        cursor: "pointer",
        padding: "5px 10px",
        background: "#607D8B",
        color: "#EBEBEB"
      };
    } else {
      return {
        cursor: "pointer",
        padding: "5px 10px"
      };
    }
  };

  render() {
    const { addQuestionnaireAnswer, goToNextStep, errors, PTS } = this.props;
    const numberOfAllQuestions = Object.keys(PTSquestions).length;
    const numberofAllAnswers = Object.keys(PTS).length;

    return (
      <Row className="show-grid well center">
        <Col md={5}>
          {errors.PTS && (
            <div className="alert alert-danger text-center">{errors.PTS}</div>
          )}
          <div className="sss-test">
            <div className="sss-instruction-wrapper">
              <p>
                KWESTIONARIUSZ TEMPERAMENTU PTS Jan Strelau, Alois Angleitner i
                Bogdan Zawadzki
              </p>
              <p>
                Stwierdzenia zawarte w tym kwestionariuszu dotyczą różnych cech
                temperamentu. Proszę ustosunkować się do wszystkich stwierdzeń.
                Proszę opisać siebie szczerze, takim jakim Pan był (jaką Pani
                była) w przybliżeniu przez ostatni rok (ostatnie kilka lat), a
                nie takim, jakim chciałby Pan (chciałaby Pani) być. Pomocą w
                ustosunkowaniu się do stwierdzeń może być porównanie siebie z
                innymi osobami tej samej płci i mniej więcej w tym samym wieku.
                Żadna z odpowiedzi w kwestionariuszu nie jest dobra ani zła,
                ponieważ każdy temperament ma swoje zalety. Oczywiście
                zachowanie i poglądy zmieniają się w zależności od sytuacji.
                Proszę jednak dokonać ogólnej oceny mówiącej, jaki Pan jest
                (jaka Pani jest) zazwyczaj.
              </p>

              <ol>
                <li>Zdecydowanie nie zgadzam się</li>
                <li>Raczej nie zgadzam się</li>
                <li>Raczej się zgadzam</li>
                <li>Zdecydowanie zgadzam się</li>
              </ol>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <tbody>
                  {PTSquestions.map((question, i) => (
                    <tr key={question.id}>
                      <td
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          width: 10
                        }}
                      >
                        {i + 1}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {question.text}
                      </td>
                      <td style={{ width: 30, verticalAlign: 'middle' }}>
                        Nie
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column"
                          }}
                        >
                          <small style={{ marginBottom: 10 }}>Wybierz: </small>
                          <div>
                            {[
                              { num: 1, label: "Zdecydowanie nie zgadzam się" },
                              { num: 2, label: "Raczej nie zgadzam się" },
                              {num: 3, label: 'Raczej się zgadzam'},
                              {num:4, label: 'Zdecydowanie zgadzam się'},
                            ].map(number => (
                              <span
                                key={number.num}
                                style={{ width: 100 }}
                                title={number.label}
                                style={this.getStyles(question.id, number.num)}
                                onClick={() =>
                                  addQuestionnaireAnswer(
                                    question.id,
                                    number.num,
                                    "PTS"
                                  )}
                              >
                                {number.num}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td style={{ width: 30, verticalAlign: 'middle'}}>Tak</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Button
            className="btn-next"
            bsStyle="primary"
            bsSize="large"
            onClick={() =>
              goToNextStep("PTS", numberOfAllQuestions === numberofAllAnswers)}
          >
            Dalej
          </Button>
        </Col>
      </Row>
    );
  }
}
