import React from 'react';
import Router from 'react-router';
import FilterOptions from './filter-options';
import Item from './item';
import Api from '../api';

let Link = Router.Link;

class Box extends React.Component {

  state = {
    // No need to sync parent items.
    items: this.props.items,
    moreLoaded: false,
    moreToLoad: true,
    currentLoaded: config.loadingItems
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    });
  }

  render() {
    let loadContent;

    if( ! this.state.moreLoaded) {
      loadContent = <div className="load-more" onClick={this.loadMore.bind(this)}>Load more {this.props.category.name}</div>
    } else {
      loadContent = <i className="icon-load-more"></i>
    }

    let items = this.state.items.map((value, key) => {
      return <Item key={key} data={value} category={this.props.category.slug} />
    });

    return (

      <div className="box-wrap">

        <section className="box">
          <div className="wrap">

            <Link to={config.uri + this.props.category.slug} className="box-headline">
              {this.props.category.name} ({this.props.category.items_count.aggregate})
            </Link>

            <FilterOptions category={this.props.category.slug} changeFilter={this.changeFilter.bind(this)} />

            <div className="items">
              { ! this.state.items.length ? <i className="icon-box-load"></i> : items}
            </div>

          </div>
        </section>

        {this.state.items.length >= config.loadingItems && this.state.moreToLoad && this.props.category
          ? <div className="wrap"><div className="load-more-wrap">{loadContent}</div></div>
          : ''}

      </div>

    );
  }

  changeFilter(filterBy, category) {
    Api.changeUsersFilterFor(category, filterBy);

    this.setState({
      items: []
    });

    setTimeout(() => {
      Api.items(this.props.type, this.props.category.slug, filterBy, this.props.currentLoaded).then((value) => {
        this.setState({
          items: value.items
        });
      })
    }, 200);
  }

  loadMore() {
    this.setState({
      moreLoaded: true
    });

    setTimeout(() => {

      Api.moreCategoryItems(this.props.category, this.state.currentLoaded).then((value) => {
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

export default Box;
