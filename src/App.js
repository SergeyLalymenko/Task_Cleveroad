import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import theme from './theme'
import { ThemeProvider } from '@material-ui/core'
import { addNewCollection } from './store/actions/stickers'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header/Header'
import StickersList from './components/StickersList/StickersList'
import StickerForm from './components/StickerForm/StickerForm'
import Login from './components/Login/Login'
import { fire } from './firebase'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css'



function App({addNewCollection}) {

  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationPassword, setVerificationPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState('');

  const createdTheme = theme(darkMode);

  useEffect(() => {
    authListener();
    checkUserMode();
  }, [])

  function toggleTheme(){
    darkMode ? setMode(false) : setMode(true)
  }

  function checkUserMode(){
    const isDarkMode = localStorage.getItem('darkMode');
    switch(isDarkMode){
      case 'true': setMode(true); break;
      case 'false': setMode(false); break;
      default: localStorage.setItem('darkMode', false); break;
    }
  }

  function setMode(boolean){
    localStorage.setItem('darkMode', boolean);
    setDarkMode(boolean);
  }

  function clearInputs(){
    setEmail('');
    setPassword('');
  }

  function clearErrors(){
    setEmailError('');
    setPasswordError('');
  }

  function handleLogin(){
    clearErrors();
    fire.auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      switch(err.code){
        case 'auth/user-disabled':
        case 'auth/user-not-found': setEmailError(err.message); break;
        case 'auth/invalid-email': setPasswordError(err.message); break;
      }
    })
  }

  function handleSignup(){
    if(password == verificationPassword){
      signupUser();
    } else {
      setPasswordError('Passwords do not match');
    }
  }

  function signupUser(){
    clearErrors();
    fire.auth()
    .createUserWithEmailAndPassword(email, password).then(() => addNewCollection())
    .catch((err) => {
      switch(err.code){
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':setEmailError(err.message); break;
        case 'auth/weak-password': setPasswordError(err.message); break;
      }
    })
  }

  function handleLogout(){
    fire.auth().signOut();
  }

  function authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        clearInputs();
        setUser(user)
      } else{
        setUser('none')
      }
    })
  }

  return (
      <Router>
        <ThemeProvider theme={createdTheme}>
          <CssBaseline/>
            <div className="main">
              {user == '' ? 'Загрузка...' : user !== 'none' ? (
                <>
                  <Header onToggleThemeClick={toggleTheme} handleLogout={handleLogout}/>
                  <Switch>
                    <Route path="/form/:id">
                      <StickerForm/>
                    </Route>
                    <Route path="/form">
                      <StickerForm/>
                    </Route>
                    <Route path="/list">
                      <StickersList/>
                    </Route>
                    <Route path="*">
                      <Redirect to="/list"></Redirect>
                    </Route>
                  </Switch>
                </>
              ) : (
                <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} verificationPassword={verificationPassword}setVerificationPassword={setVerificationPassword} handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount} setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>
              )}
            </div>
        </ThemeProvider>
      </Router>
  );
}

const mapDispatchToProps = {
  addNewCollection,
}

export default connect(null, mapDispatchToProps)(App)