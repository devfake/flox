import React from 'react';
import Router from 'react-router';
import ReactTooltip from 'react-tooltip';
import FilterOptions from './filter-options';
import Item from './item';
import Api from '../api';

let Link = Router.Link;

class Box extends React.Component {

  state = {
    // No need to sync parent items.
    items: this.props.items
  }

  render() {
    let items = this.state.items.map((value, key) => {
      return <Item key={key} data={value} category={this.props.category.slug} />
    });

    return (

      <section className="box">
        <ReactTooltip effect="float" place="right" />

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

    );
  }

  changeFilter(filterBy, category) {
    Api.changeUsersFilterFor(category, filterBy);

    this.setState({
      items: []
    })

    // todo: Move to api.
    setTimeout(() => {
      $.get(config.api + this.props.type + '-items/' + this.props.category.slug + '/' + filterBy, (value) => {
        this.setState({
          items: value.items
        })
      });
    }, 200);
  }
}

export default Box;
