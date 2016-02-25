import React from 'react';
import Api from '../api';

class Admin extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
        {this.props.logged ? 'Eingeloggt' : 'Ausgeloggt'}
      </div>

    );
  }
}

export default Admin;
