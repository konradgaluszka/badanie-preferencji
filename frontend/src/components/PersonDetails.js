import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';


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
            console.log(gender, age)
            let errors = {...this.state.errors};
            errors.person = 'Wprowadzone dane są niewłaściwe'
            this.setState({ errors });
            return;
        }
        this.props.getPerson(this.state);
    }

    render() {
        const { gender, age, residence, education, errors } = this.state;

        let wellStyle = {
            background: '#fefcfc',
            height: 380,
            flexDirection: 'column',
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
                            <div className="">
                                <div className="person-gender-wrapper">
                                    <label>Wybierz płeć:</label>
                                    <div className="select-style">
                                        <select
                                            name="gender"
                                            value={gender}
                                            onChange={this.handleChange}
                                            style={{color: this.handleColor(gender)}}
                                        >
                                            <option value="" disabled>Płeć</option>
                                            <option value="man">Mężczyzna</option>
                                            <option value="woman">Kobieta</option>
                                        </select>
                                    </div>
                                </div>
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
                                <div className="person-education-wrapper">
                                    <label>Wybierz wykształcenie:</label>
                                    <div className="select-style">
                                        <select
                                            name="education"
                                            value={education}
                                            onChange={this.handleChange}
                                            style={{color: this.handleColor(education)}}
                                        >
                                            <option value="" disabled>wykształcenie</option>
                                            <option value="niepod">Niepełne podstawowe</option>
                                            <option value="pod">Podstawowe</option>
                                            <option value="gim">Gimnazjalne</option>
                                            <option value="zaszaw">Zasadnicze zawodowe</option>
                                            <option value="sred">Średnie</option>
                                            <option value="poli">Policealne</option>
                                            <option value="lic">Licencjat/Inżynier</option>
                                            <option value="wyz">Wyższe</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="person-residence-wrapper">
                                    <label>Wybierz miejsce zamieszkania: </label>
                                    <div className="select-style">
                                        <select
                                            name="residence"
                                            value={residence}
                                            onChange={this.handleChange}
                                            style={{color: this.handleColor(residence)}}
                                        >
                                            <option value="" disabled>zamieszkanie</option>
                                            <option value="man">Wieś</option>
                                            <option value="city10">Miasto do 10 tyś. mieszk.</option>
                                            <option value="city50">Miasto 50 tyś. - 100 tyś. mieszk.</option>
                                            <option value="city100">Miasto 100 tyś. - 500 tyś. mieszk.</option>
                                            <option value="city500">Miasto powyżej 500 tyś. mieszk.</option>
                                        </select>
                                    </div>
                                </div>
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
