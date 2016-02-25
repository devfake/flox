import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../../api';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.username).focus();
  }

  render() {
    return (

      <div className="login-wrap">
        <form className="login-form" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" className="login-input" placeholder="Username" ref="username" value={this.state.username} onChange={this.setUsername.bind(this)} />
          <input type="password" className="login-input" placeholder="Password" value={this.state.password} onChange={this.setPassword.bind(this)} />
          <input type="submit" value="Login" className="login-submit" />
        </form>
      </div>

    );
  }

  onSubmit(event) {
    event.preventDefault();

    let username = this.state.username;
    let password = this.state.password;

    if( ! username || ! password) {
      return;
    }

    alert("submit");
  }

  setUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value
    });
  }
}

export default Login;
