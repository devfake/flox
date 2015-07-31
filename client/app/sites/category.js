import React from 'react';
import Box from '../partials/box';
import Api from '../api';

class Category extends React.Component {

  state = {
    category: {},
    items: [],
    currentLoaded: config.loadingItems,
    moreLoaded: false,
    moreToLoad: true
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      category: {},
      items: [],
      currentLoaded: config.loadingItems
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
        {this.state.items.length
          ? <Box items={this.state.items} category={this.state.category} type="category" currentLoaded={this.state.currentLoaded} />
          : <i className="icon-content-load"></i>}
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
}

export default Category;
