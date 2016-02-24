import React from 'react';
import Box from '../partials/box';
import Api from '../api';

class Home extends React.Component {

  constructor() {
    super();
    this.loadHomeItems();

    this.state = {
      items: []
    };
  }

  render() {
    let boxes = this.state.items.map((value, key) => {
      return <Box items={value.items} category={value.category} key={key} logged={this.props.logged} type="home" currentLoaded="5" />
    });

    return (

      <div>
        { ! this.state.items.length ? <i className="icon-content-load"></i> : boxes}
      </div>

    );
  }

  loadHomeItems() {
    let items = [];
    let requests = [];
    let self = this;

    Api.categories().then((value) => {
      value.forEach((data) => {
        requests.push($.get(config.api + 'home-items/' + data.slug + '/' + Api.usersFilterFor(data.slug)));
      });

      $.when.apply($, requests).then(function() {
        for(let i = 0; i < arguments.length; i++) {
          items.push({
            category: arguments[i][0].category,
            items: arguments[i][0].items
          });
        }

        self.setState({
          items: items
        });
      });
    });
  }
}

export default Home;
