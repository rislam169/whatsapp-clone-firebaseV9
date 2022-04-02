import './login.css';
import {Button} from "@material-ui/core";
import {auth, provider} from "./firebase";
import {signInWithPopup} from "firebase/auth";
import {useStateValue} from "./StateProvider";
import {actionType} from "./reducer";

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                dispatch({
                    type: actionType.SET_USER,
                    user: result.user
                });
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png" alt="Logo"/>
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
