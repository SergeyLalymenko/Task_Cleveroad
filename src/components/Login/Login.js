import React from 'react'



function Login({email, setEmail, password, setPassword, verificationPassword, setVerificationPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError}){
  return (
    <section className="login">
        <div className="loginContainer">
            <label>Username</label>
            <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p className="errorMsg">{emailError}</p>
            <label>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p className="errorMsg">{passwordError}</p>
            {!hasAccount ? (
                <>
                    <label>Verification password</label>
                    <input type="password" required value={verificationPassword} onChange={(e) => setVerificationPassword(e.target.value)}/>
                </>
            ) : ''}
            <div className="btnContainer">
                {hasAccount ? (
                    <>
                        <button className="button" onClick={handleLogin}>Sign in</button>
                        <p>Dont have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                    </>
                ) : (
                    <>
                        <button className="button" onClick={handleSignup}>Sign up</button>
                        <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                    </>
                )
                }
            </div>
        </div>
    </section>
  )
}

export default Login