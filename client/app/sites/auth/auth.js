import React from 'react';
import Login from './login';
import Admin from './admin';

class Auth extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
        {this.props.logged ? <Admin /> : <Login checkLogin={this.props.checkLogin} />}
      </div>

    );
  }
}

export default Auth;
