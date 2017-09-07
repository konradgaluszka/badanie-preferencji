import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';



export class SongDetails extends Component {
    render() {

        return (
            <Row className="show-grid well center">
                <Col md={5}>
                    <p>
                        Ostatnia część badania jest odsłuchową ankietą muzyczną.
                    Składa się z 26 fragmentów piosenek.
                    Uprzejmie proszę o wsłuchanie się w aktualnie odsłuchiwany utwór
                    i odpowiedzenie na wszystkie wyświetlające się pytania.
                    Ilość czasu poświęcona na odsłuchiwanie poszczególnego utworu jest nieograniczona.
                    </p>
                    <Button
                        className='btn-next'
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => this.props.goToNextStep('SongDetails', true)}>
                        Dalej
                    </Button>
                </Col>
            </Row>
        );
    }
}
