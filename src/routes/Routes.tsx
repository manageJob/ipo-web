import { Route, Switch } from 'react-router-dom'
import ValidateToken from '../components/authen/validate-token/ValidateToken'
import ManageUser from '../manage-user/ManageUser'
import ManageUserDetail from '../manage-user/ManageUserDetail'
import SettingProfile from '../setting-profile/SettingProfile'


const Routes: React.FC = () => {
    return (
        <Switch>
             <Route key='manageUser' path='/manage-user'>
                <ManageUser />
            </Route>
            <Route key='manageUserDetail' path='/manage-user-detail'>
                <ManageUserDetail />
            </Route>
            <Route key='setting' path='/setting'>
                <SettingProfile />
            </Route>
            <Route
                exact
                path="/validate-token/:access_token"
                key="validateToken"
                component={ValidateToken}
            />
        </Switch>
    )
}

export default Routes
