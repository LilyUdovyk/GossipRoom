import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { IRootState } from './store/rootReducer';

const Registration = React.lazy(() => import("./components/Registration"));
const Authorization = React.lazy(() => import("./components/Authorization"));
const Profile = React.lazy(() => import("./components/Profile"));
const CreationNewChat = React.lazy(() => import("./components/CreationNewChat"));
const UserSettings = React.lazy(() => import("./components/UserSettings"));
const ChatSettings = React.lazy(() => import("./components/ChatSettings"));


const mapStateToProps = (state: IRootState) => ({
    authToken: state.auth.authData.authToken
})

type RoutesProps = ReturnType<typeof mapStateToProps>

const Routes: React.FC<RoutesProps> = ({ authToken }) => (
    <React.Suspense fallback={<div>Загрузка...</div>}>
        <Switch>
            <Route exact path='/sign-in' component={Authorization} />
            <Route exact path='/registration' component={Registration} />
            {!authToken && <Redirect from="/" to='/sign-in' />}
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/new-group' component={CreationNewChat} />
            <Route exact path='/user-settings' component={UserSettings} />
            <Route exact path='/chat-settings' component={ChatSettings} />
            {authToken && <Redirect from="/" to='/profile' />}
            <Route path="/" render={() => <div>Page Not Found</div>} />

        </Switch>
    </React.Suspense>
)
export default connect(mapStateToProps)(React.memo(Routes))