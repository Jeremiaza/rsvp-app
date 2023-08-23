import React, { useState } from 'react'
import "./App.css";
import CustomInput from "./components/LoginScreen/CustomInput/CustomInput";
import Notification from "./components/Notification/Notification";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { setNotification } from './reducers/notificationReducer'
import { setLoading } from './reducers/commonReducer'
import { setCurrentGuest } from './reducers/guestReducer'
import { connect } from 'react-redux'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton';

const App = (props) => {
    const [user, setUser] = useState(null)
    const [accessCode, setAccessCode] = useState("")
    const { loading } = props;
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        dispatch(setLoading(true));
        event.preventDefault()

        if (accessCode) {
            try {
                const user = await loginService.login({
                    accessCode,
                })
                dispatch(setCurrentGuest(user))
                setUser(user)
            } catch (exception) {
                dispatch(setNotification({ message: "Väärä pääsykoodi tai ei yhteyttä", notificationType: "error" }))
            } finally {
                setAccessCode("")
                dispatch(setLoading(false));
            }
        }

    }
    return (
        <div className="App">
            {!user ?
                <form className="login">
                    <CustomInput
                        labelText="Pääsykoodi"
                        id="access-code"
                        formControlProps={{
                            fullWidth: true
                        }}
                        value={accessCode}
                        handleChange={({ target }) => setAccessCode(target.value)}
                        type="text"
                    />
                    <LoadingButton className={"login_button"} loading={loading} variant="outlined" onClick={handleLogin} disabled={!accessCode}>
                        Kirjaudu sisään
                    </LoadingButton>
                </form>
                :
                <HomeScreen />
            }
            <Notification />
        </div>
    );
}

const mapStateToProps = (state) => {
    return state.common
}

export default connect(
    mapStateToProps
)(App)
