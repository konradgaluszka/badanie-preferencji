import React from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export default class TopNavbar extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Badanie preferencji muzycznych</a>
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
