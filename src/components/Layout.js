import React from 'react';

import TopNavbar from './TopNavbar';


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
