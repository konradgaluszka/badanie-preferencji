import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


export default class TopNavbar extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Badanie preferencji muzycznych</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Opis</NavItem>
                        <NavItem eventKey={2} href="#">Kontakt</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
