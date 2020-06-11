import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { IRootState } from './store/rootReducer';
import Registration from './components/Registration';
import Authorization from './components/Authorization';
import Profile from './components/Profile';
import CreationNewChat from './components/CreationNewChat';

const mapStateToProps = (state: IRootState) => ({
    authToken: state.auth.authData.authToken
})

type RoutesProps = ReturnType<typeof mapStateToProps>

const Routes: React.FC<RoutesProps> = ({ authToken }) => (
    <Switch>
        <Route exact path="/sign-in" component={Authorization} />
        <Route exact path="/registration" component={Registration} />
        {!authToken && <Redirect from="/" to="/sign-in" />}
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/new_group" component={CreationNewChat} />
        {authToken && <Redirect from="/" to="/profile" />}
        <Route path="/" render={() => <p>Page Not Found</p>} />
    </Switch>
)
export default connect(mapStateToProps)(React.memo(Routes))