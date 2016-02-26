import React from 'react';
import {Router, Link} from 'react-router';
import FilterOptions from './filter-options';
import Item from './item';
import Api from '../api';

class Box extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // No need to sync parent items.
      items: this.props.items,
      hasLoaded: this.props.hasLoaded,
      moreLoaded: false,
      moreToLoad: true,
      currentLoaded: config.loadingItems,
      activeKey: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    });
  }

  render() {
    let loadContent;
    let category = this.props.category[0];

    if( ! this.state.moreLoaded) {
      loadContent = <div className="load-more" onClick={this.loadMore.bind(this)}>Load more</div>
    } else {
      loadContent = <i className="icon-load-more"></i>
    }

    let items = this.state.items.map((value) => {
      return <Item key={value.id} id={value.id} data={value} logged={this.props.logged} category={category.slug} activeKey={this.state.activeKey} changeActiveKey={this.changeActiveKey.bind(this)} />
    });

    return (

      <div className="box-wrap">

        <section className="box">
          <div className="wrap">

            <Link to={config.uri + category.slug} className="box-headline no-select">
              {category.name == 'No Category' ? 'All' : category.name} ({this.props.category.items_count})
            </Link>

            <FilterOptions
              category={category.slug}
              changeFilter={this.changeFilter.bind(this)}
            />

            <div className="items">
              { ! this.state.items.length ? (this.state.hasLoaded ? <div className="no-items-found">Nothing found :(</div> : <i className="icon-box-load" />) : items}
            </div>

          </div>
        </section>

        {this.state.items.length >= config.loadingItems && this.state.moreToLoad && this.props.category
          ? <div className="wrap"><div className="load-more-wrap no-select">{loadContent}</div></div>
          : ''}

      </div>

    );
  }

  changeFilter(filterBy, category) {
    Api.changeUsersFilterFor(category, filterBy);

    this.setState({
      items: [],
      hasLoaded: false
    });

    setTimeout(() => {
      Api.items(this.props.type, category, filterBy).then((value) => {
        this.setState({
          items: value.items,
          hasLoaded: true
        });
      })
    }, 200);
  }

  loadMore() {
    this.setState({
      moreLoaded: true
    });

    setTimeout(() => {

      Api.moreCategoryItems(this.props.category[0], this.state.currentLoaded).then((value) => {
        this.setState({
          currentLoaded: this.state.currentLoaded + config.loadingItems,
          items: this.state.items.concat(value),
          moreLoaded: false,
          moreToLoad: value.length ? true : false
        });
      });

    }, 400);
  }

  changeActiveKey(key) {
    this.setState({
      activeKey: key
    });
  }
}

export default Box;
