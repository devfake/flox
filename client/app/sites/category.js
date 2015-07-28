import React from 'react';
import Box from '../partials/box';
import Api from '../api';

class Category extends React.Component {

  state = {
    category: {},
    items: [],
    currentLoaded: config.loadingItems
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      category: {},
      items: []
    });
    
    this.loadCategoryItems(nextProps);
  }

  constructor(props) {
    super(props);
    this.loadCategoryItems(props);
  }

  // todo: fix icon load.
  render() {
    return (

      <div>
        { ! this.state.items.length ? <i className="icon-content-load"></i> : <Box items={this.state.items} category={this.state.category} type="category" currentLoaded={this.state.currentLoaded} />}
        {this.state.items.length >= config.loadingItems ? <div className="wrap"><div className="load-more" onClick={this.loadMore.bind(this)}>Load more {this.state.category.name}</div></div> : ''}
      </div>

    );
  }

  loadCategoryItems(props) {
    setTimeout(() => {
      Api.categoryItems(props.params.category).then((value) => {
        this.setState({
          category: value.category,
          items: value.items
        });
      });
    }, 200);
  }

  loadMore() {
    Api.moreCategoryItems(this.state.category, this.state.currentLoaded).then((value) => {
      this.setState({
        currentLoaded: this.state.currentLoaded + config.loadingItems,
        items: this.state.items.concat(value)
      });
    });
  }
}

export default Category;
