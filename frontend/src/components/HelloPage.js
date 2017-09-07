import React from 'react';
import { Link } from 'react-router'
import { Grid, Row, Jumbotron, Button } from 'react-bootstrap';


export default class HelloPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Jumbotron>
                        <p>
                            Witam!
                        </p>
                        <p>
                            Jestem studentką V roku Psychologii i
                        w związku z praca magisterską prowadzę badania dotyczące preferencji muzycznych.
                        Mam ogromną prośbę o pomoc w wypełnieniu kwestionariuszy na ten temat.
                        Udział oczywiście jest anonimowy. Jeśli masz chwilę czasu, to serdecznie zapraszam.
                        Bardzo prosiłabym o rzetelne odpowiedzi na pytania, ponieważ tylko takie będą miały wartość.
                        Z góry serdecznie dziękuję.
                            </p>
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
