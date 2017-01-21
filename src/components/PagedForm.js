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

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={8}>
                        <PageHeader>Another brick in the wall <small>Pink Floyd</small></PageHeader>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={5}>
                        <Image src={"/images/" + currentQuestion().img} responsive/>
                    </Col>
                    <Col xs={6} md={7}>
                        <h3>{currentQuestion().label}</h3>
                        <strong>1. Pytanie pierwsze, Pytanie pierwsze, Pytanie pierwsze, Pytanie pierwsze</strong>
                        <Radio checked readOnly>
                            Tak
                        </Radio>
                        <Radio readOnly>
                            Nie
                        </Radio>
                        <strong>2. Pytanie drugie, Pytanie drugie, Pytanie drugie, Pytanie drugie</strong>
                        <Radio readOnly>
                            Tak
                        </Radio>
                        <Radio checked readOnly>
                            Nie
                        </Radio>
                        <strong>3. Pytanie trzecie, Pytanie trzecie, Pytanie trzecie, Pytanie trzecie,</strong>
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
