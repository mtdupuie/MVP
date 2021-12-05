import React from 'react';

const LoginScreen = (props) => {
  return (
    <div className="login-plate">
      <div className="loginSection">
        <div className="loginContainer">
          <h1 className="loginHeader">Welcome to Hack In or Git Out!</h1>
          <div className="usernameText">Username:</div>
          <input className="usernameInput" placeholder="username" value={props.username} onChange={props.handleUsername}></input>
          <div className="passwordText">Password:</div>
          <input className="passwordInput" placeholder="password" vaule={props.password} onChange={props.handlePassword}></input>
          <button className="loginButton" onClick={() => {props.submitSignUp()}}>Sign Up</button>
          <button className="loginButton" onClick={() => {props.submitLogin()}}>Login</button>
          {props.loginAlertStatus ?
          <div className="betAlert"  style={{textAlign: 'center'}}>{props.loginAlert}</div>
          :
          null
          }
          <div className="disclaimer">*Please do not use real passwords. This is an educational project and I do have access to the information <i className="fa fa-thumbs-up"></i>*</div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen;