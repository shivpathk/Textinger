import React from "react";
import './Login.scss'
import { Button } from "@mui/material";
import { auth, provider } from "../../firebase";
import { signInWithPopup} from "firebase/auth";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../Reducer";

const Login = () => {

    const [{},dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        }).catch(error => { alert(error.message) })
    }
    return <div className="login">
        <div className="login-container">
            <img
                src="https://static-00.iconduck.com/assets.00/chat-icon-1024x1024-o88plv3x.png"
                alt="logo"
            />
            <div className="login-text">
                <h1>Textinger - Texting with Strangers</h1>
            </div>
                <h2>Sign in to Textinger</h2>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>
    </div>;
};

export default Login;
