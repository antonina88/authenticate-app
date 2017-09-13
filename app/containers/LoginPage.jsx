import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('UsersStore')
@observer
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.validate = this.validate.bind(this);
  }
  validate(login, password) {
    if (!login) {
      const inputLogin = document.querySelector("[name='login']");
      inputLogin.classList.add('invalid');
    }
    if (!password) {
       const inputPassword = document.querySelector("[name='password']");
       inputPassword.classList.add('invalid');
    }
  }
  handleLoginChange(ev) {
    ev.target.classList.remove('invalid');
    this.setState({ login: ev.target.value });
  }
  handlePasswordChange(ev) {
    ev.target.classList.remove('invalid');
    this.setState({ password: ev.target.value });
  }

  handleLogIn(ev) {
    ev.preventDefault();
    const { login, password } = this.state;
    const { UsersStore } = this.props;
    this.validate(login, password);
    if (login && password) {
      UsersStore.auth(login, password);
    }
  }

  render() {
    const { successMessage, errorMessage, isFetching } = this.props.UsersStore;
    const btnAuth = isFetching ? [
       <button key="auth-spin">
         <svg className = "auth-spin" height="32" id="cog" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0 H18 L19 6 L20.707 6.707 L26 3.293 L28.707 6 L25.293 11.293 L26 13 L32 14 V18 L26 19 L25.293 20.707 L28.707 26 L26 28.707 L20.707 25.293 L19 26 L18 32 L14 32 L13 26 L11.293 25.293 L6 28.707 L3.293 26 L6.707 20.707 L6 19 L0 18 L0 14 L6 13 L6.707 11.293 L3.293 6 L6 3.293 L11.293 6.707 L13 6 L14 0 z M16 10 A6 6 0 0 0 16 22 A6 6 0 0 0 16 10"/>
         </svg>
        </button>
    ] :
    [<button className="SignIn" onClick={this.handleLogIn} key="btn-signin">Login &rarr; </button>];
    const content = successMessage ? [
          <div className="success-message" key={successMessage}>
            <svg enableBackground="new 0 0 80 80" height="80px" id="Icons" version="1.1" viewBox="0 0 80 80" width="80px" xmlns="http://www.w3.org/2000/svg">
                <g><polygon points="54.849,26.565 36.464,44.95 25.151,33.636 20.908,37.879 36.464,53.435 59.092,30.808" /></g>
            </svg>
            <p>{successMessage}</p>
          </div>
      ] :
      [<form className="auth" action="/" key="logining">
            <div className="auth-header">
                <p className="logo">&nbsp;</p>
                <h2>Login</h2>
            </div>
            <p className="error-block">{errorMessage}</p>
            <input type="text" value={this.state.login} name="login" onChange={this.handleLoginChange} placeholder="Login" />
            <input type="password" value={this.state.password} name="password" onChange={this.handlePasswordChange} placeholder="Password" />
            {btnAuth}
        </form>
       ];

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default LoginPage;
