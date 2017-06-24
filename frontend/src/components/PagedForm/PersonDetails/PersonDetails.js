import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { dataSelect } from '../../../data';
import { SelectOption } from './SelectOption';


export class PersonDetails extends Component {
    state = {
        age: '',
        gender: '',
        education: '',
        residence: '',
        errors: {}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errors: {}
        });
    }

    handleColor = (value) => {
        return value === '' ? 'grey' : 'black';
    }

    addPersonData = (e) => {
        const { gender, age, residence, education } = this.state;
        e.preventDefault();

        if (gender === '' || residence === '' || education === '' || isNaN(age) || age < 1 || age > 120) {
            let errors = {...this.state.errors};
            errors.person = 'Wprowadzone dane są niewłaściwe'
            this.setState({ errors });
            return;
        } else {
            this.props.getPerson(this.state);
            this.props.goToNextStep('person', true);
        }
    }

    render() {
        const { age, errors } = this.state;

        let wellStyle = {
            background: '#fefcfc',
            height: 380,
            flexDirection: 'column',
            padding: 0,
            margin: 0,
        };

        return (
            <Row className="show-grid well center" style={wellStyle}>
                { 
                    errors.person && 
                    <div className="alert alert-danger text-center person-error">
                        {errors.person}
                    </div>
                }
                <Col xs={6} md={7}>
                    <form className="person-details-form" onSubmit={(e) => this.addPersonData(e)}>
                        <div className="person-inputs-wrapper">
                            <div>
                                <SelectOption
                                    dataSelect={dataSelect.gender}
                                    handleChange={this.handleChange}
                                    handleColor={this.handleColor}
                                    {...this.state}
                                />
                                <div className="person-age-wrapper">
                                    <label>Podaj wiek: </label>
                                    <input
                                        type="text"
                                        value={age}
                                        name="age"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <SelectOption
                                    dataSelect={dataSelect.education}
                                    handleChange={this.handleChange}
                                    handleColor={this.handleColor}
                                    {...this.state}
                                />
                                <SelectOption
                                    dataSelect={dataSelect.residence}
                                    handleChange={this.handleChange}
                                    handleColor={this.handleColor}
                                    {...this.state}
                                />
                            </div>
                        </div>
                        <div className="person-button-wrapper">
                            <Button
                                className="next-song-submit-btn"
                                bsStyle="primary"
                                bsSize="large"
                                onClick={(e) => this.addPersonData(e)}>
                                Przejdź do ankiety
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row>
        );
    }
}
