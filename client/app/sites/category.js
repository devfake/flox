import React from 'react';
import Box from '../partials/box';
import Api from '../api';
import { browserHistory } from 'react-router'

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.loadCategoryItems(props);

    this.state = {
      category: {},
      items: [],
      currentLoaded: config.loadingItems,
      moreLoaded: false,
      moreToLoad: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      category: {},
      items: []
    });
    
    this.loadCategoryItems(nextProps);
  }

  // todo: fix icon load.
  render() {
    return (

      <div>
        {this.state.items.length
          ? <Box items={this.state.items} category={this.state.category} logged={this.props.logged} type="category" />
          : <i className="icon-content-load"></i>}
      </div>

    );
  }

  loadCategoryItems(props) {
    setTimeout(() => {
      Api.categoryItems(props.params.category).done((value) => {
        this.setState({
          category: value.category,
          items: value.items
        });
      }).fail((value) => {
        browserHistory.push(config.uri);
      });
    }, 200);
  }
}

export default Category;
