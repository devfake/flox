import React from 'react';
import Api from '../api';

class FilterOptions extends React.Component {

  render() {
    return (

      <div className="box-options">
        <i className={'icon-time ' + this.setActiveIf('seen')} title="Last Seen" onClick={this.changeFilter.bind(this, 'seen')} />
        <i className={'icon-star ' + this.setActiveIf('rating')} title="Best Rated" onClick={this.changeFilter.bind(this, 'rating')} />
      </div>

    );
  }

  setActiveIf(type) {
    if(type === Api.usersFilterFor(this.props.category)) {
      return 'active';
    }

    return '';
  }

  changeFilter(filterBy) {
    this.props.changeFilter(filterBy, this.props.category);
  }
}

export default FilterOptions;
