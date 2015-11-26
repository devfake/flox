import React from 'react';
import Api from '../api';

class FilterOptions extends React.Component {

  render() {
    return (

      <div className="box-options">
        <i className={'icon-time ' + this.setActiveIf('seen')} title="Last Seen" onClick={this.props.changeFilter.bind(null, 'seen', this.props.category)}></i>
        <i className={'icon-star ' + this.setActiveIf('rating')} title="Best Rated" onClick={this.props.changeFilter.bind(null, 'rating', this.props.category)}></i>
      </div>

    );
  }

  setActiveIf(type) {
    if(type === Api.usersFilterFor(this.props.category)) {
      return 'active';
    }

    return '';
  }
}

export default FilterOptions;
