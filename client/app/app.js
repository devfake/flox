import React from 'react';
import Router from 'react-router';
import Api from './api';
import Home from './sites/home';
import Category from './sites/category';
import Show from './sites/show';
import Header from './partials/header';
import Footer from './partials/footer';

let Route = Router.Route;

let RouteHandler = Router.RouteHandler;

class Flox extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
}

let routes = (
  <Route handler={Flox} path={config.uri}>
    <Route handler={Home} />
    <Route path=":category" handler={Category} />
    <Route path=":category/:item" handler={Show} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root />, document.querySelector('.flox'));
});
