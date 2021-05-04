import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { Google } from './LoginManager';

const Login = () => {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useContext(UserContext);

    const handleGoogleSignIn = () => {
        Google()
            .then(response => {
                const data = response;
                setUser(data);
                history.replace(from);
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn}>Logging With Google</button>
        </div>
    );
};

export default Login;