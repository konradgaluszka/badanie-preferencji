import React from 'react';
import {Row, Jumbotron, Button} from 'react-bootstrap';


export default class HelloPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Row className="show-grid">
                <Jumbotron>
                    <h1>Hello, world!</h1>
                    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
                        featured content or information.
                        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
                        featured content or information.
                        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
                        featured content or information.</p>
                    <p><Button bsStyle="primary" onClick={this.props.changeToNextPage}>Rozpocznij słuchanie</Button></p>
                </Jumbotron>
            </Row>
        );
    }
};
