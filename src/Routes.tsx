import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { IRootState } from './store/rootReducer';
import Registration from './components/Registration';
import Authorization from './components/Authorization';
import Profile from './components/Profile';

const mapStateToProps = (state: IRootState) => ({
    token: state.auth.authData.token
})

type RoutesProps = ReturnType<typeof mapStateToProps>

const Routes: React.FC<RoutesProps> = ({ token }) => (
    <Switch>
        <Route exact path="/sign-in" component={Authorization} />
        <Route exact path="/registration" component={Registration} />
        {!token && <Redirect from="/" to="/sign-in" />}
        <Route exact path="/profile" component={Profile} />
        <Route path="/" render={() => <p>Page Not Found</p>} />
    </Switch>
)

export default connect(mapStateToProps)(React.memo(Routes))