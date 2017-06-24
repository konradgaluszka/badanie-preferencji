import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HelloPage from './components/HelloPage';
import Layout from './components/Layout';
import PagedForm from './components/PagedForm/PagedForm';
import NotFoundPage from './components/NotFoundPage';


const routes = (
    <Route path='/' component={Layout}>
        <IndexRoute component={HelloPage} />
        <Route path='/survey' component={PagedForm} />
        <Route path='*' component={NotFoundPage} />
    </Route>
);

export default routes;
