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
                        Jestem studentką V roku Psychologii
                        i w związku z praca magisterską prowadzę badania dotyczące preferencji muzycznych. 
                        Mam ogromną prośbę o pomoc w wypełnieniu testów związanych z tym tematem. 
                        Badanie składa się z kwestionariusza temperamentu, testu preferencji muzycznych, 
                        kwestionariusza, oraz odsłuchowej ankiety preferencji. Udział oczywiście jest anonimowy. 
                        Całość badania zajmuje około 25 minut. Bardzo proszę o rzetelne odpowiedzi na pytania, 
                        ponieważ tylko takie będą miały wartość. 
                        
                        Z góry serdecznie dziękuję,
                        Maja Ferens
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
