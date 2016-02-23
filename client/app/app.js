import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Api from './api';
import Home from './sites/home';
import Category from './sites/category';
import Show from './sites/show';
import Header from './partials/header';
import Footer from './partials/footer';


class Flox extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route component={Flox} path={config.uri}>
      <IndexRoute component={Home} />
      <Route path=":category" component={Category} />
      <Route path=":category/:item" component={Show} />
    </Route>
  </Router>
), document.querySelector('.flox'));