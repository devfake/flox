import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Api from './api';
import Home from './sites/home';
import Category from './sites/category';
import Header from './partials/header';
import Footer from './partials/footer';

class Flox extends React.Component {

  constructor() {
    super();

    this.state = {
      logged: false
    };

    this.checkLogin();
  }

  render() {
    return (
      <div>
        <Header logged={this.state.logged} />
        {this.props.children}
        <Footer />
      </div>
    );
  }

  checkLogin() {
    Api.checkLogin().then((value) => {
      this.setState({
        logged: value
      })
    });
  }
}

render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route component={Flox} path={config.uri}>
      <IndexRoute component={Home} />
      <Route path=":category" component={Category} />
    </Route>
  </Router>
), document.querySelector('.flox'));