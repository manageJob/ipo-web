import { Route, Switch } from 'react-router-dom'
import ValidateToken from '../components/authen/validate-token/ValidateToken'
import DepositDetail from '../components/deposit-withdraw/DepositDetail'
import DepositWithdraw from '../components/deposit-withdraw/DepositWithdraw'
import WithdrawDetail from '../components/deposit-withdraw/WithdrawDetail'
import ManageUser from '../manage-user/ManageUser'
import ManageUserDetail from '../manage-user/ManageUserDetail'
import News from '../news/News'
import NewsDetail from '../news/NewsDetail'
import SettingProfile from '../setting-profile/SettingProfile'


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route key='news' path='/news'>
                <News />
            </Route>
            <Route key='newsDetail' path='/news-detail'>
                <NewsDetail />
            </Route>
            <Route key='manageUser' path='/manage-user'>
                <ManageUser />
            </Route>
            <Route key='depositWithdraw' path='/deposit-withdraw'>
                <DepositWithdraw />
            </Route>
            <Route key='depositDetail' path='/deposit-detail'>
                <DepositDetail />
            </Route>
            <Route key='withdrawDetail' path='/withdraw-detail'>
                <WithdrawDetail />
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
