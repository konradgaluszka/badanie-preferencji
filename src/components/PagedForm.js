import React from 'react';
import {Grid, Row, Col, Image, PageHeader, Radio, ProgressBar, Pagination, small, ButtonToolbar, Button} from 'react-bootstrap';
import {questions} from '../data/questions';

export default class PagedForm extends React.Component {
    constructor() {
        super();
        this.state = {
            currentQuestionIndex: 1
        };
    }

    render() {
        let currentQuestion = () => {
            return questions[this.state.currentQuestionIndex];
        };

        let changeToNextQuestion = () => {
            this.setState({currentQuestionIndex: Math.min(this.state.currentQuestionIndex + 1, questions.length - 1)})
        };

        let changeToPrevQuestion = () => {
            this.setState({currentQuestionIndex: Math.max(this.state.currentQuestionIndex - 1, 0)})
        };

        let changeToQuestion = (index) => {
            this.setState({currentQuestionIndex: index - 1});
        };

        let getProgress = () => {
          return Math.floor(((this.state.currentQuestionIndex + 1) / questions.length ) * 100);
        };

        let wellStyle = {
          background: '#fefcfc'
        };
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={8}>
                        <PageHeader>Część słuchowa <small>Posłuchaj i odpowiedz na pytania</small></PageHeader>
                    </Col>
                </Row>
                <Row className="show-grid well" style={wellStyle}>
                    <Col xs={6} md={5} className="text-center">
                        <Image src={"/images/music.jpg"} responsive/>
                        <h2>00:45</h2>
                    </Col>
                    <Col xs={6} md={7}>
                        <h3>{currentQuestion().label}</h3>
                        <strong>1. {questions[0].text}</strong>
                        <Radio checked readOnly>
                            Tak
                        </Radio>
                        <Radio readOnly>
                            Nie
                        </Radio>
                        <strong>2. {questions[1].text}</strong>
                        <Radio readOnly>
                            Tak
                        </Radio>
                        <Radio checked readOnly>
                            Nie
                        </Radio>
                        <strong>3. {questions[2].text}</strong>
                        <Radio checked readOnly>
                            Tak
                        </Radio>
                        <Radio readOnly>
                            Nie
                        </Radio>
                        <ButtonToolbar>
                            <Button bsSize="large" onClick={changeToPrevQuestion} disabled={this.state.currentQuestionIndex == 0}>
                                Wstecz</Button>
                            <Button bsStyle="primary" bsSize="large" onClick={changeToNextQuestion}
                                    disabled={this.state.currentQuestionIndex == questions.length - 1}>Następne pytanie</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid text-center">
                    <ProgressBar now={getProgress()} label={`${getProgress()}%`} />
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={questions.length}
                            maxButtons={10}
                            activePage={this.state.currentQuestionIndex + 1}
                            onSelect={changeToQuestion} />
                </Row>
                <hr/>
            </Grid>
        );
    }
};
