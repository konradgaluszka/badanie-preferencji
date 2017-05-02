import React from 'react';
import { Link } from 'react-router'
import { Grid, Row, Jumbotron, Button } from 'react-bootstrap';


export default class HelloPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Jumbotron>
                        <h1>Hello, world!</h1>
                        <p>This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information. This is a simple hero unit,
                            a simple jumbotron-style component for calling extra attention to featured
                            content or information. This is a simple hero unit, a simple jumbotron-style
                            component for calling extra attention to featured content or information.</p>
                        <p>
                            <Link to="/survey">
                                <Button bsStyle="primary">Rozpocznij ankietę</Button>
                            </Link>
                        </p>
                    </Jumbotron>
                </Row>
            </Grid>
        );
    }
};
