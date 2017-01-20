'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import PagedForm from './components/PagedForm';
import NotFoundPage from './components/NotFoundPage';

const routes = (
    <Route path='/' component={Layout}>
        <IndexRoute component={PagedForm}/>
        <Route path='*' component={NotFoundPage}/>
    </Route>
);

export default routes;
