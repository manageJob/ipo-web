import { Route, Switch } from 'react-router-dom'
import ValidateToken from '../components/authen/validate-token/ValidateToken'
import Home from '../home/Home'
import Login from '../login/Login'


const Routes: React.FC = () => {
    return (
        <Switch>
             <Route key='login' path='/login'>
                <Login />
            </Route>

            <Route key='home' path='/home'>
                <Home />
            </Route>
            
            <Route key='main' path='/main'>
                {/* <Main /> */}
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
