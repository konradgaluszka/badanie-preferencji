import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";

import { questionaireQuestions } from "../../../data";

export class Questionnaire extends Component {
  getStyles = (id, number) => {
    const { questionnaire } = this.props;
    const shared = {
      cursor: "pointer",
      padding: "5px 10px"
    };
    if (questionnaire[`Q${id + 1}`] === number) {
      return {
        background: "#607D8B",
        color: "#EBEBEB",
        ...shared
      };
    } else {
      return shared;
    }
  };

  render() {
    const {
      addQuestionnaireAnswer,
      goToNextStep,
      errors,
      questionnaire
    } = this.props;
    const numberOfAllQuestions = Object.keys(questionaireQuestions).length;
    const numberofAllAnswers = Object.keys(questionnaire).length;

    return (
      <Row className="show-grid well center">
        <Col md={5}>
          {errors.questionnaire && (
            <div className="alert alert-danger text-center">
              {errors.questionnaire}
            </div>
          )}
          <div className="sss-test">
            <div className="sss-instruction-wrapper">
              <p>Kwestionariusz sytuacji słuchania muzyki</p>
              <p>
                Uprzejmie proszę o ustosunkowanie się do poniższych stwierdzeń.
                Odnoszą się one do różnych sytuacji słuchania muzyki. Proszę
                zaznaczyć jak często Pan/Pani w danej sytuacji słucha muzyki.
              </p>
              <ol>
                <li>Nigdy</li>
                <li>Rzadko</li>
                <li>Niekiedy</li>
                <li>Często</li>
                <li>Zawsze</li>
              </ol>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  {questionaireQuestions.map((question, i) => (
                    <tr key={question.id}>
                      <td>{i + 1}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        {question.text}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {[1, 2, 3, 4, 5].map(number => (
                          <span
                            key={number}
                            style={this.getStyles(question.id, number)}
                            onClick={() =>
                              addQuestionnaireAnswer(
                                question.id,
                                number,
                                "questionnaire"
                              )}
                          >
                            {number}
                          </span>
                        ))}
                      </td>
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
              goToNextStep(
                "questionnaire",
                numberOfAllQuestions === numberofAllAnswers
              )}
          >
            Dalej
          </Button>
        </Col>
      </Row>
    );
  }
}
