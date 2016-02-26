import React from 'react';
import Box from '../partials/box';
import Api from '../api';
import { browserHistory } from 'react-router'

class Category extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      category: {},
      items: [],
      hasLoaded: false,
      currentLoaded: config.loadingItems,
      moreLoaded: false,
      moreToLoad: true
    };
  }

  componentDidMount() {
    this.loadCategoryItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      category: {},
      items: []
    });
    
    this.loadCategoryItems(nextProps);
  }

  render() {
    return (

      <div>
        {this.state.items.length ?
          <Box
            hasLoaded={this.state.hasLoaded}
            items={this.state.items}
            category={this.state.category}
            logged={this.props.logged}
            type="category"
          /> :
          (this.state.hasLoaded ? <div className="no-items-found">Nothing found :(</div> : <i className="icon-content-load" />)}
      </div>

    );
  }

  loadCategoryItems(props) {
    this.setState({
      hasLoaded: false
    });

    setTimeout(() => {
      Api.categoryItems(props.params.category).done((value) => {
        this.setState({
          category: value.category,
          items: value.items,
          hasLoaded: true
        });
      }).fail((value) => {
        browserHistory.push(config.uri);
      });
    }, 200);
  }
}

export default Category;
