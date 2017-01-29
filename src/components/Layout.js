'use strict';

import React from 'react';
import {Link} from 'react-router';
import TopNavbar from './TopNavbar';
import {Panel, Jumbotron} from 'react-bootstrap';

export default class Layout extends React.Component {
    render() {

        return (
            <div>
                <TopNavbar/>
                {this.props.children}
            </div>
        );
    };
};
