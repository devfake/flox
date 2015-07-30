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
    let loadContent;

    if( ! this.state.moreLoaded) {
      loadContent = <div className="load-more" onClick={this.loadMore.bind(this)}>Load more {this.state.category.name}</div>
    } else {
      loadContent = <i className="icon-load-more"></i>
    }

    return (

      <div>
        {this.state.items.length
          ? <Box items={this.state.items} category={this.state.category} type="category" currentLoaded={this.state.currentLoaded} />
          : <i className="icon-content-load"></i>}

        {this.state.items.length >= config.loadingItems && this.state.moreToLoad
          ? <div className="wrap"><div className="load-more-wrap">{loadContent}</div></div>
          : ''}
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
    this.setState({
      moreLoaded: true
    });

    setTimeout(() => {

      Api.moreCategoryItems(this.state.category, this.state.currentLoaded).then((value) => {
        this.setState({
          currentLoaded: this.state.currentLoaded + config.loadingItems,
          items: this.state.items.concat(value),
          moreLoaded: false,
          moreToLoad: value.length ? true : false
        });
      });

    }, 400);
  }
}

export default Category;
